// This file contains the main logic that accesses the user's React application's state
// Stores state on load
// Uses React Dev Tools Global Hook to track state changes based on user interactions
console.log('Currently in injected.js');

import { detailedDiff } from 'deep-object-diff';
import stateChanges from './statechanges.ts';

// Trying to convert to Typescript:
// declare global {
//   interface Window {
//     __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;
//   }
// }
const dev = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
// console.log('dev ', dev);

let prevMemoizedState;
let currMemoizedState;
let memoizedStateDiff;
// -----------------------------------------------------------------------------------
// const stringArr = [];
// Initializing a message object which will be posted to
let msgObj = {type: 'addTest', message: []}
// -----------------------------------------------------------------------------------

// Save fiberRoot on load
// let fiberNodeTest = dev.getFiberRoots(1);
// console.log('fiber node test', fiberNodeTest)
let fiberNode = dev.getFiberRoots(1).values().next().value.current.child;
console.log('fiberNode on load:', fiberNode)

// findMemState returns the user's application's state
const findMemState = (node) => {
	// Finds the fiberNode on which memoizedState resides
	while (node.memoizedState === null) {
		node = node.child;
	}
	node = node.memoizedState
	while (typeof(node.memoizedState) !== 'object') {
		node = node.next
	}
	//return the memoizedState of the found fiberNode
	return node.memoizedState;
}
		
//assign currMemoizedState the state object which findMemState finds on page load
currMemoizedState = findMemState(fiberNode);

// -----------------------------------------------------------------------------------

let testArray = stateChanges(currMemoizedState);
// stringArr.push(stateChanges(currMemoizedState));
msgObj.message = testArray; // msgObj = {type: 'addTest', message: []}
// window.postMessage(msgObj,'*');
window.postMessage(msgObj,'*');
// -----------------------------------------------------------------------------------

//invoke stateChanges on the currMemoizedState to generate the initial state tests

// console.log('fiberNode', fiberNode)
console.log('currMemoizedState on load:', currMemoizedState);

// ****** Invoke function to generate tests ******
// stateChanges(currMemoizedState);

// onCommitFiberRoot is USED TO TRACK STATE CHANGES
// patching / rewriting the onCommitFiberRoot functionality
// onCommitFiberRoot runs functionality every time there is a change to the page
dev.onCommitFiberRoot = (function (original) {
	return function (...args) {
		// console.log('args:', args);

		// Reassign fiberNode when onCommitFiberRoot is invoked
		fiberNode = args[1].current.child;
		console.log('fibernode inside oncommitfiberroot', fiberNode)

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
			console.log('prevMemoizedState:', prevMemoizedState);
			console.log('currMemoizedState:', currMemoizedState);
			console.log('memoizedStateDiff:', memoizedStateDiff);

      // ****** Invoke function to generate tests ******
      // stateChanges(currMemoizedState, prevMemoizedState, memoizedStateDiff);
			testArray = stateChanges(
				currMemoizedState,
				prevMemoizedState,
				memoizedStateDiff,
				false,
				testArray
			);

      // -----------------------------------------------------------------------------------
			// stringArr.push(testArray);
      msgObj.message = testArray; // msgObj = { type: 'addTest', message: [(testArray)] }
      // msgObj posted to content.js, which is running in the (active window?)
	    window.postMessage(msgObj,'*') 
      // -----------------------------------------------------------------------------------


			// ****** Invoke function to generate tests ******
			// stateChanges(currMemoizedState, prevMemoizedState, memoizedStateDiff);
		}
	};
})(dev.onCommitFiberRoot);

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
