console.log('Currently in injected.js');

// console.log('logging window --------------');
// console.log(window)

// console.log('REACT DEVTOOLS GLOBAL HOOK');
// console.log(window.__REACT_DEVTOOLS_GLOBAL_HOOK__);

// WHERE THE LOGIC TO MANIPULATE __REACT_DEVTOOLS_GLOBAL_HOOK__
// commit change

const dev = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

console.log(dev);

dev.onCommitFiberRoot = (function (original) {
  return function (...args) {

    // console.log('logging from onCommitFiberRoot!!');
    
    const fiberNode = args[1].current.child;
    // const fiberNode = args[1];
    // console.log('This is the fiberNode: ', fiberNode);
    console.log('This is the fiberNode(args[1].current.child): ', fiberNode);
    
    // console.log('This is the fiberNode.memoizedState: ', fiberNode.memoizedState);
    // console.log('This is the fiberNode.child.memoizedState: ', fiberNode.child.memoizedState);
    
    // console.log('Logging dev.onCommitFiberRoot: ', dev.onCommitFiberRoot);
    // console.log('logging args: ', args)


    // CONDITIONAL: IF STATE CHANGED
      // THEN add to Linked List


  };
})(dev.onCommitFiberRoot);

// const hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
// const oldHook = {...dev};
// dev.onCommitFiberRoot = (...args) => {
//     // custom code here
    

    
//     oldHook.onCommitFiberRoot(...args);
// };


// const testFunc = function (original) {
//   return function (...args){
//     console.log('Logging dev.onCommitFiberRoot: ', dev.onCommitFiberRoot);

//     // PULL OUT STATE FUNCTION

//   };
// }

// // On each commit to the fiber root node?
// dev.onCommitFiberRoot = (testFunc)(dev.onCommitFiberRoot)



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
function checkMemoizedStateDifferences(prevMemoizedState, currMemoizedState) {
  // Conditional: Check if array lengths are different
  if (prevMemoizedState.length !== currMemoizedState.length) {
    // If so, return the new object
    return currMemoizedState[length - 1];
  // Else, the array lengths are the same
  } else {
    // Iterate through the currMemoizedState input array
    for (let i = 0; i < currMemoizedState.length; i++) {
      // Conditional: check if current element is NOT the same as the element in prevMemoizedState
      // If so, return the current element in currMemoizedState
      if (currMemoizedState[i] !== prevMemoizedState[i]) return currMemoizedState[i];
    }
  }
  // No Differences, Return null 
  return null;
}

// -----------------------------------------------------------------------------------------------------
