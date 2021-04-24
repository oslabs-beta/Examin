console.log('Currently in injected.js');

import { diff } from 'deep-object-diff';



// console.log('logging window --------------');
// console.log(window)
// console.log('REACT DEVTOOLS GLOBAL HOOK');
// console.log(window.__REACT_DEVTOOLS_GLOBAL_HOOK__);

// WHERE THE LOGIC TO MANIPULATE __REACT_DEVTOOLS_GLOBAL_HOOK__

// Trying to convert to Typescript:
// declare global {
//   interface Window {
//     __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;
//   }
// }


const dev = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
console.log('the dev ', dev)

// console.log(dev);

let prevMemoizedState;
let currMemoizedState;
let MemoizedStateDiff;
let firstRun = true;

let fiberRoot = dev.getFiberRoots(1).values().next().value
console.log('the fiber root', fiberRoot.current.child.child.memoizedState.memoizedState)


// dev.onCommitFiberRoot = (function (original) {
dev.onCommitFiberRoot = (function () {
  return function (...args) {
    console.log('the args', args)
    // FiberRootNode.current.child.child.memoizedState


    const fiberNode = args[1].current.child;
    // console.log('This is the fiberNode: ', fiberNode);
    // console.log('This is the fiberNode(args[1].current.child): ', fiberNode);
    // console.log('This is the fiberNode.child.memoizedState: ', fiberNode.child.memoizedState);
    // console.log('Logging dev.onCommitFiberRoot: ', dev.onCommitFiberRoot);
    // console.log('logging args: ', args);

    // save memState
    // To Do: account for apps that store state in fiberNode.memoizedState.memoizedState
    let memState = fiberNode.child.memoizedState;
    
    
    


    // Conditional: check if memoizedState is on fiberNode
      // If so, assign memState to fiberNode.memoizedState
    // Else, assign memState to fiberNode.child.memoizedState

    // // On first run
    if (firstRun) {
      currMemoizedState = memState;
      console.log('first run memstate',memState)
      firstRun = false;
      // stateChanges(currMemoizedState);
      // Not first run
    } else {
      // Conditional: check if state changed
        // If so, change currMemoizedState
        prevMemoizedState = currMemoizedState;
        // currMemoizedState = memState;
        // let MemoizedStateDiff = diffingAlgo(currMemoizedState, prevMemoizedState);
        // stateChanges(prevMemoizedState, currMemoizedState, MemoizedStateDiff);
    }
    

  };
})(dev.onCommitFiberRoot);
// setTimeout(dev.onCommitFiberRoot(), 10000)




// function diffingAlgo()
// INPUT needed
// @param prevMemoizedState :  
// @param currMemoizedState : 

// OUTPUT:
// @param MemoizedStateDiff : an object(s) that contain the difference in prevMemoizedState and currMemoizedState
// -----------------------------------------------------------------------------------


// -----------------------------------------------------------------------------------









// Function to check for the differences in memoizedState --------------------------------------------

// Case 1:
// const prevMemoizedState = [{text: "Walk the dog", complete: true}, {text: "Write app", complete: false}, {text: "test", complete: false}]
// const currMemoizedState = [{text: "Walk the dog", complete: true}, {text: "Write app", complete: false}, {text: "test", complete: true}]
// Input the previous memoizedState and current memoizedState
// Input: checkMemoizedStateDifferences(prevMemoizedState, currMemoizedState)
// Output: {'state': {{text: "test", complete: true}}, 'changeType': 'update'} // the differences in memoizedState

// Case 2:
// const prevMemoizedState = [{text: "Walk the dog", complete: true}, {text: "Write app", complete: false}, {text: "test", complete: false}]
// const currMemoizedState = [{text: "Walk the dog", complete: true}, {text: "Write app", complete: false}, {text: "test", complete: false}, {text: "adding", complete: false}]
// Input the previous memoizedState and current memoizedState
// Input: checkMemoizedStateDifferences(prevMemoizedState, currMemoizedState)
// Output: {'state': [{text: "adding", complete: false}], 'changeType': 'added'}

// Case 3:
// const prevMemoizedState = [{text: "Walk the dog", complete: true}, {text: "Write app", complete: false}, {text: "test", complete: false}]
// const currMemoizedState = []
// Input the previous memoizedState and current memoizedState
// Input: checkMemoizedStateDifferences(prevMemoizedState, currMemoizedState)
// Output:  [{'state': [{text: "Walk the dog", complete: true}, {text: "Write app", complete: false}, {text: "test", complete: false}], 'changeType': 'removed'}]

// Case 4:
// const prevMemoizedState = []
// const currMemoizedState = [{text: "Walk the dog", complete: true}, {text: "Write app", complete: false}, {text: "test", complete: false}]
// Input the previous memoizedState and current memoizedState
// Input: checkMemoizedStateDifferences(prevMemoizedState, currMemoizedState)
// Output: {text: "Walk the dog", complete: true}, {text: "Write app", complete: false}, {text: "test", complete: false}


// Assumptions (check if true): the currMemoizedState's difference will either be a single additional object or the object's property value 
// function checkMemoizedStateDifferences(prevMemoizedState, currMemoizedState) {
//   // Conditional: Check if array lengths are different
//   if (prevMemoizedState.length !== currMemoizedState.length) {
//     // If so, return the new object
//     return currMemoizedState[length - 1];
//   // Else, the array lengths are the same
//   } else {
//     // Iterate through the currMemoizedState input array
//     for (let i = 0; i < currMemoizedState.length; i++) {
//       // Conditional: check if current element is NOT the same as the element in prevMemoizedState
//       // If so, return the current element in currMemoizedState
//       if (currMemoizedState[i] !== prevMemoizedState[i]) return currMemoizedState[i];
//     }
//   }
//   // No Differences, Return null 
//   return null;
// }

// -----------------------------------------------------------------------------------------------------


