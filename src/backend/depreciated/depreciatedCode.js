

// NOTES ABOUT DIFFING ALGORITHM / currently using deep-object-diff library
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
