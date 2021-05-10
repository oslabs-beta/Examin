// This file contains the main logic that accesses the user's React application's state
// Stores state on load
// Uses React Dev Tools Global Hook to track state changes based on user interactions
console.log('Currently in injected.js');

import testGenerator from './testGenerator.ts';

const dev = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
console.log('react devtools global hook object: ', dev);

let prevMemoizedState;
let currMemoizedState;

let userInput = '';
let componentElements = []; // [{element: '', count: 0}]
// -----------------------------------------------------------------------------------
// Initializineg a message object which will be sent to content.js
let msgObj = { type: 'addTest', message: [] };
// -----------------------------------------------------------------------------------

// Logic for pause/recording -----------------------------------------------------
const mode = {
	paused: false,
};

// -----------------------------------------------------------------------------------
// Save fiberNode on load
let fiberNode = dev.getFiberRoots(1).values().next().value.current.child;
// console.log('fiberNode on load:', fiberNode);
// -----------------------------------------------------------------------------------

// Listens to messages from content.js
const handleMessage = (request, sender, sendResponse) => {
	if (request.data.name === 'pauseClicked') {
		mode.paused = true;
	}
	if (request.data.name === 'recordClicked') {
		mode.paused = false;
	}
	// Handle logic for
	if (request.data.name === 'submitRootDir') {
		userInput = request.data.userInput;
		// makes the tests and puts it into the examin window - ensuring refresh
		testResult = treeTraversal(fiberNode);
		tests = testGenerator(testResult);
		msgObj.message = tests;
		window.postMessage(msgObj, '*');
	}
};

window.addEventListener('message', handleMessage);

// -----------------------------------------------------------------------------------
// findMemState returns the user's application's state
const findMemState = (node) => {
	// Finds the fiberNode on which memoizedState resides
	while (node.memoizedState === null) {
		node = node.child;
	}
	node = node.memoizedState;
	// Isn't this finding props, not state?
	while (typeof node.memoizedState !== 'object') {
		node = node.next;
	}
	// return the memoizedState of the found fiberNode
	return node.memoizedState;
};

// Accpes user input from Examin Panel
const getComponentFileName = (node, rootDirectory) => {
	if (!node.child || !node.child._debugSource) {
		return '<ADD FILE PATH>';
	}
	let regex = /\\/g
	let fileName = node.child._debugSource.fileName;
	// let scopesTest = '[[Scopes]]';
	// let fileName = node.elementType[2].module.i;
	// console.log('Scope', fileName);
	// return fileName;
	if (rootDirectory === '') {
		fileName = fileName.replace(regex, '/');
		return fileName;
	}
	if (fileName.includes(rootDirectory)) {
		const indexOfFirst = fileName.indexOf(rootDirectory);
		const index = indexOfFirst + rootDirectory.length;
		fileName = fileName.replace(regex, '/');
		return '..' + fileName.slice(index);
	}
};

const getComponentName = (node) => {
	return node.elementType.name;
};

let indices = {};

const grabComponentChildInfo = (node) => {
	const componentChildInfo = {};
	componentChildInfo.componentName = node.elementType.name;
	if (!indices.hasOwnProperty(componentChildInfo.componentName)) {
		indices[componentChildInfo.componentName] = 0;
	} else {
		indices[componentChildInfo.componentName] += 1;
	}
	componentChildInfo.componentIndex = indices[componentChildInfo.componentName];
	return componentChildInfo;
};

const grabHtmlChildInfo = (node) => {
	const htmlChildInfo = {};
	htmlChildInfo.innerText = '';
	htmlChildInfo.elementType = node.elementType;
	if (!indices.hasOwnProperty(htmlChildInfo.elementType)) {
		indices[htmlChildInfo.elementType] = 0;
	} else {
		indices[htmlChildInfo.elementType] += 1;
	}
	htmlChildInfo.elementIndex = indices[htmlChildInfo.elementType];
	if (
		htmlChildInfo.elementType !== 'div' &&
		htmlChildInfo.elementType !== 'ul' 
		// && node.stateNode
	) {
		htmlChildInfo.innerText = node.stateNode.innerText;
	}
	return htmlChildInfo;
};

const getComponentInfo = (node) => {
	const componentInfo = {};
	componentInfo.name = getComponentName(node);
	componentInfo.fileName = getComponentFileName(node, userInput);
	componentInfo.props = node.memoizedProps;
	componentInfo.componentChildren = [];
	componentInfo.htmlChildren = [];

	const getComponentInfoHelper = (currNode) => {
		currNode = currNode.child;
		while (currNode !== null) {
			//some logic to fill out component/html children
			// If React Component
			if (currNode.elementType && currNode.elementType.name) {
				componentInfo.componentChildren.push(grabComponentChildInfo(currNode));

				// If html element
			} else if (currNode.elementType) {
				componentInfo.htmlChildren.push(grabHtmlChildInfo(currNode));
				getComponentInfoHelper(currNode);
			}
			currNode = currNode.sibling;
		}
	};

	getComponentInfoHelper(node);

	return componentInfo;
};

const treeTraversal = (node) => {
	const testInfoArray = [];
	const treeHelper = (currNode) => {
		if (currNode === null || currNode.elementType === null) return;
		if (currNode.elementType.name) {
			// console.log(
			// 	'this is the currNode.elementType.name: ',
			// 	currNode.elementType.name
			// );
			indices = {};
			testInfoArray.push(getComponentInfo(currNode));
		} else {
		}
		currNode = currNode.child;
		// console.log('currNode after currNode.child reset', currNode);
		while (currNode !== null) {
			treeHelper(currNode);
			currNode = currNode.sibling;
		}
	};
	treeHelper(node);
	return testInfoArray;
};

let testResult = treeTraversal(fiberNode);
let tests = testGenerator(testResult);
console.log('the test result array: ', testResult);

// -----------------------------------------------------------------------------------
// Generate test for default state
// invoke stateChanges on the currMemoizedState to generate the initial state tests
msgObj.message = tests; // msgObj = {type: 'addTest', message: []}
window.postMessage(msgObj, '*');
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

			// initialize a stateChange variable as a boolean which will tell if state changed or not
			// onCommitFiberRoot will run every time the user interacts with the page, regardless of if
			// that interaction actually changes state
			const stateChange =
				JSON.stringify(newMemState) !== JSON.stringify(currMemoizedState);
			// Run the test generation function only if the state has actually changed
			if (stateChange) {
				testResult = treeTraversal(fiberNode);
				tests = testGenerator(testResult);
				msgObj.message = tests;
				window.postMessage(msgObj, '*');
				console.log('sample test object in onCommitFiberRoot: ', testResult);
				prevMemoizedState = currMemoizedState;
				currMemoizedState = newMemState;				
			}
		}
	};
})(dev.onCommitFiberRoot);
// -----------------------------------------------------------------------------------
