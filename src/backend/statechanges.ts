// import { prevMemoizedState, currMemoizedState, MemoizedStateDiff } from './injected.js';

// INPUT needed:
// @param prevMemoizedState : {}
// @param currMemoizedState : {}
// @param MemoizedStateDiff : {}

// OUTPUT: '' = describe string that continually gets concatenated, until user clicks download or save

// stateChanges accepts 1 required parameter and 4 default parameters
// firstInvocation tracks if it is the first invocation of stateChanges()
// describeBlockArray contains array of describe block strings
export default function stateChanges(
	currMemoizedState: object,
	prevMemoizedState = null,
	memoizedStateDiff = null,
	firstInvocation: boolean = true,
	describeBlockArray: Array<string> = []
) {
	//---------------------------------------------------------------------------------------
	// console.log('in statechanges')
	// let testType = 'addTest'
	// let testMessage = `
	//   // Initial describe statement for default initialized state
	//   describe('default state', () => {
	//     it('should return a default state when given an undefined input', () => {
	//       // expect(currMemoizedState[0]).toEqual({});
	//       // expect(currMemoizedState[1]).toEqual({});
	//       // expect(currMemoizedState).toEqual([{},{}]);
	//     });
	//   });
	// `;
	// let testOverall = { type: testType, message: testMessage }
	// let testOverall = { type: testType }
	// window.postMessage(testOverall,'*')
	//---------------------------------------------------------------------------------------

	// chrome.runtime.sendMessage('kjnelkhbfmfpbpjncbhdpnemfpibomio',{ action: 'addTest' });
	// let describeBlock: string = '';
	// const describeBlockArray: Array<string> = [];

	// On first invocation of stateChanges, generate test for default initalized state. reassign firstInvocation to false
	if (firstInvocation === true) {
		// add test for default state to describeBlockArray
		describeBlockArray.push(`
      // Initial describe statement for default initialized state
      describe('default state', () => {
        it('should return a default state when given an undefined input', () => {
          // expect(currMemoizedState[0]).toEqual(${JSON.stringify(
						currMemoizedState[0]
					)});
          // expect(currMemoizedState[1]).toEqual(${JSON.stringify(
						currMemoizedState[1]
					)});
          // expect(currMemoizedState).toEqual(${JSON.stringify(
						currMemoizedState
					)});
        });
      });
    `);
		firstInvocation = false;
		// console.log('firstInvocation Expect FALSE:', firstInvocation);

		// Else if not first invocation of stateChanges, ...
	} else {
		// add state changed test to describeBlockArray
		//non-initial
		describeBlockArray.push(`
      // Added a todo!
      describe('state changed!', () => {
        // Added a first todo!
        it('should useStateHook variable where component changed', () => {
          // expect(prevMemoizedState).toNotEqual(currMemoizedState);
          // expect(currMemoizedState).toStrictlyEqual([{},{},{text: 'test1', complete: 'false'}]);
          // expect(MemoizedStateDiff).toStrictlyEqual([{text: 'test1', complete: 'false'}])
        });
      });
    //   `);
	}
	console.log('describeBlockArray:', describeBlockArray);
	return describeBlockArray;

	// Conditional (on initial): check if prevMemoizedState and MemoizedStateDiff is null
	// describeBlock = `
	//   // Initial describe statement for default initialized state
	//   describe('default state', () => {
	//     it('should return a default state when given an undefined input', () => {
	//       // expect(currMemoizedState[0]).toEqual({});
	//       // expect(currMemoizedState[1]).toEqual({});
	//       // expect(currMemoizedState).toEqual([{},{}]);
	//     });
	//   });
	// `;

	// // Else (not-initial)
	// describeBlock += `
	//   // Added a todo!
	//   describe('state changed!', () => {
	//     // Added a first todo!
	//     it('should useStateHook variable where component changed', () => {
	//       // expect(prevMemoizedState).toNotEqual(currMemoizedState);
	//       // expect(currMemoizedState).toStrictlyEqual([{},{},{text: 'test1', complete: 'false'}]);
	//       // expect(MemoizedStateDiff).toStrictlyEqual([{text: 'test1', complete: 'false'}])
	//     });
	//   });
	// //   `;
}

// describe('TODOS state changes', () => {

//   // beforeEach(() => {
//     // wrapper = shallow(<TodoListItem {...props} />);
//   // })

//   // Initial describe statement for default initialized state
//   describe('default state', () => {
//     it('should return a default state when given an undefined input', () => {
//       // expect(currMemoizedState[0]).toEqual({});
//       // expect(currMemoizedState[1]).toEqual({});
//       // expect(currMemoizedState).toEqual([{},{}]);
//     });
//   });

//   // Added a todo!
//   describe('state changed!', () => {
//     // Added a first todo!
//     it('should useStateHook variable where component changed', () => {
//       // expect(prevMemoizedState).toNotEqual(currMemoizedState);
//       // expect(currMemoizedState).toStrictlyEqual([{},{},{text: 'test1', complete: 'false'}]);
//       // expect(MemoizedStateDiff).toStrictlyEqual([{text: 'test1', complete: 'false'}])
//     });

//     // Added a second todo!
//     it('should useStateHook variable where component changed', () => {
//       // expect(prevMemoizedState).toNotEqual(currMemoizedState);
//       // expect(currMemoizedState).toStrictlyEqual([{},{},{},{text: 'test2', complete: 'false'}]);
//       // expect(MemoizedStateDiff).toStrictlyEqual([{text: 'test2', complete: 'false'}])
//     });

//     // Added a third todo!
//     it('should useStateHook variable where component changed', () => {
//       // expect(prevMemoizedState).toNotEqual(currMemoizedState);
//       // expect(currMemoizedState).toStrictlyEqual([{},{},{},{text: 'test2', complete: 'false'}]);
//       // expect(MemoizedStateDiff).toStrictlyEqual([{text: 'test2', complete: 'false'}])
//     });

//   });

// })
// -----------------------------------------------------------------------------------------------
