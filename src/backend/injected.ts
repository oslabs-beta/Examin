// This file contains the main logic that accesses the user's React application's state
// Stores state on load
// Uses React Dev Tools Global Hook to track state changes based on user interactions
console.log("Currently in injected.js");

// any declaration is necessary here because the window will only have the react devtools global hook
// property once the page is loading into a chrome browser with the
declare const window: any;

import testGenerator from "./testGenerator";
import treeTraversal from "./treeTraversal";

const dev = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

let currMemoizedState;

let userInput = "";
// -----------------------------------------------------------------------------------
// Initializineg a message object which will be sent to content.js
const msgObj = { type: "addTest", message: [] };
// -----------------------------------------------------------------------------------

// Logic for pause/recording -----------------------------------------------------
const mode = {
  paused: false,
};

// -----------------------------------------------------------------------------------
// Save fiberNode on load
let fiberNode = dev.getFiberRoots(1)?.values()?.next()?.value?.current?.child;
console.log("fiberNode on load:", fiberNode);
// -----------------------------------------------------------------------------------

// Listens to messages from content.js
const handleMessage = (request) => {
  if (request.data.name === "pauseClicked") {
    mode.paused = true;
  }
  if (request.data.name === "recordClicked") {
    mode.paused = false;
  }
  // Handle logic for
  if (request.data.name === "submitRootDir") {
    fiberNode = dev.getFiberRoots(1)?.values()?.next()?.value?.current?.child;
    userInput = request.data.userInput;
    // makes the tests and puts it into the examin window - ensuring refresh
    createAndSendTestArray(fiberNode, userInput);
  }
};

window.addEventListener("message", handleMessage);

// -----------------------------------------------------------------------------------
// findMemState returns the user's application's state
const findMemState = (node: FiberNode) => {
  // Finds the fiberNode on which memoizedState resides
  while (node.memoizedState === null) {
    node = node.child;
  }
  node = node.memoizedState;
  while (typeof node.memoizedState !== "object") {
    node = node.next;
  }
  // return the memoizedState of the found fiberNode
  return node.memoizedState;
};

// the createAndSendTestArray will use the fibernode and user input (root directory) to generate the array of
// test strings and send that array to the panel to be rendered
const createAndSendTestArray = (node: FiberNode, rootDirectory: string) => {
  //the imported treeTraversal function generates the array of objects needed by testGenerator to create the tests
  const testInfoArray = treeTraversal(node, rootDirectory);
  // testGenerator uses that array to create the array of test strings
  const tests = testGenerator(testInfoArray);
  // those testStrings are added to the msgObj object, which is then sent to the examin panel
  msgObj.message = tests; // msgObj = {type: 'addTest', message: []}
  window.postMessage(msgObj, "*");
};

setTimeout(() => {
  // -----------------------------------------------------------------------------------
  // Generate tests for default state
  createAndSendTestArray(fiberNode, userInput);
  // -----------------------------------------------------------------------------------
}, 1000);

const replacerFunc = () => {
  const visited = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (visited.has(value)) {
        return;
      }
      visited.add(value);
    }
    return value;
  };
};

// onCommitFiberRoot is USED TO TRACK STATE CHANGES ----------------------------------------
// patching / rewriting the onCommitFiberRoot functionality
// onCommitFiberRoot runs functionality every time there is a change to the page
dev.onCommitFiberRoot = (function (original) {
  // console.log("original test", original);
  return function (...args) {
    if (!mode.paused) {
      // Reassign fiberNode when onCommitFiberRoot is invoked
      fiberNode = args[1].current.child;

      // save newMemState
      const newMemState = findMemState(fiberNode);

      // initialize a stateChange variable as a boolean which will tell if state changed or not
      // onCommitFiberRoot will run every time the user interacts with the page, regardless of if
      // that interaction actually changes state
      const stateChange =
        JSON.stringify(newMemState) !==
        JSON.stringify(currMemoizedState, replacerFunc());
      // Run the test generation function only if the state has actually changed
      if (stateChange) {
        createAndSendTestArray(fiberNode, userInput);
        currMemoizedState = newMemState;
      }
    }
  };
})(dev.onCommitFiberRoot);
// -----------------------------------------------------------------------------------
