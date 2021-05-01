// This file contains the main logic that accesses the user's React application's state
// Stores state on load
// Uses React Dev Tools Global Hook to track state changes based on user interactions
console.log('Currently in injected.js');

import { detailedDiff } from 'deep-object-diff';
import stateChanges from './statechanges.ts';

const dev = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
console.log('react devtools global hook object: ', dev);

let prevMemoizedState;
let currMemoizedState;
let memoizedStateDiff;
// -----------------------------------------------------------------------------------
// Initializineg a message object which will be posted to
let msgObj = {type: 'addTest', message: []}
// -----------------------------------------------------------------------------------

// Logic for pause/recording -----------------------------------------------------
const mode = {
  paused: false,
};

const handleMessage = (request, sender, sendResponse) => {
  // console.log('The request is: ', request.data)
  if (request.data.name === 'pauseClicked') {
    mode.paused = true;
    // console.log('mode.paused should be true', mode.paused);
  } 
	if (request.data.name === 'recordClicked') {
    mode.paused = false;
    // console.log('mode.paused should be false', mode.paused);
  }
};

window.addEventListener('message', handleMessage);
// -----------------------------------------------------------------------------------

// Save fiberNode on load
let fiberNode = dev.getFiberRoots(1).values().next().value.current.child;
console.log('fiberNode on load:', fiberNode)

// findMemState returns the user's application's state
const findMemState = (node) => {
  // Finds the fiberNode on which memoizedState resides
  while (node.memoizedState === null) {
    node = node.child;
  }
  node = node.memoizedState
  // Isn't this finding props, not state?
  while (typeof(node.memoizedState) !== 'object') {
    node = node.next
  }
  // return the memoizedState of the found fiberNode
  return node.memoizedState;
}
    
// assign currMemoizedState the state object which findMemState finds on page load
currMemoizedState = findMemState(fiberNode);

// -----------------------------------------------------------------------------------
// Generate test for default state
// invoke stateChanges on the currMemoizedState to generate the initial state tests
let testArray = stateChanges(currMemoizedState);
msgObj.message = testArray; // msgObj = {type: 'addTest', message: []}
window.postMessage(msgObj,'*');
// -----------------------------------------------------------------------------------

// onCommitFiberRoot is USED TO TRACK STATE CHANGES ----------------------------------------
// patching / rewriting the onCommitFiberRoot functionality
// onCommitFiberRoot runs functionality every time there is a change to the page
dev.onCommitFiberRoot = (function (original) {
  return function (...args) {
    if (!mode.paused) {
      // Reassign fiberNode when onCommitFiberRoot is invoked
      fiberNode = args[1].current.child;

      // save newMemState
      const newMemState = findMemState(fiberNode);
      // console.log('newMemState', newMemState);

      // initialize a stateChange variable as a boolean which will tell if state changed or not
      // onCommitFiberRoot will run every time the user interacts with the page, regardless of if
      // that interaction actually changes state
      const stateChange =
        JSON.stringify(newMemState) !== JSON.stringify(currMemoizedState);
      // Run the test generation function only if the state has actually changed
      if (stateChange) {
        // console.log('state changed:', stateChange);
        prevMemoizedState = currMemoizedState;
        currMemoizedState = newMemState;
        // memoizedState will return an object with 3 properties: {added: {}, deleted: {}, updated: {}}
        memoizedStateDiff = detailedDiff(prevMemoizedState, currMemoizedState);
        // console.log('prevMemoizedState:', prevMemoizedState);
        // console.log('currMemoizedState:', currMemoizedState);
        // console.log('memoizedStateDiff:', memoizedStateDiff);
        // ****** Invoke function to generate tests ******
        testArray = stateChanges(
          currMemoizedState,
          prevMemoizedState,
          memoizedStateDiff,
          false,
          testArray
        );
        // -----------------------------------------------------------------------------------
        msgObj.message = testArray; // msgObj = { type: 'addTest', message: [(testArray)] }
        // msgObj posted to content.js, which is running in the (active window?)
        window.postMessage(msgObj,'*') 
      }
    }
  };
})(dev.onCommitFiberRoot);
// -----------------------------------------------------------------------------------
