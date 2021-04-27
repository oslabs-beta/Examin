// import { prevMemoizedState, currMemoizedState, MemoizedStateDiff } from './injected.js';




// INPUT needed: 
// @param prevMemoizedState : {}
// @param currMemoizedState : {}
// @param MemoizedStateDiff : {}

// OUTPUT: '' = describe string that continually gets concatenated, until user clicks download or save 

export default function stateChanges(currMemoizedState: object, prevMemoizedState = null, MemoizedStateDiff = null) {
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
  let describeBlock: string = '';
  
  // Conditional (on initial): check if prevMemoizedState and MemoizedStateDiff is null
  if (prevMemoizedState === null && MemoizedStateDiff === null) {
    describeBlock = `
      // Initial describe statement for default initialized state
      describe('default state', () => {
        it('should return a default state when given an undefined input', () => {
          // expect(currMemoizedState[0]).toEqual({});
          // expect(currMemoizedState[1]).toEqual({});
          // expect(currMemoizedState).toEqual([{},{}]);
        });
      });
    `;
  }
  // Else (not-initial)
  else {
    describeBlock = `
    // Added a todo!
    describe('state changed!', () => {
      // Added a first todo!
      it('should useStateHook variable where component changed', () => {
        // expect(prevMemoizedState).toNotEqual(currMemoizedState);
        // expect(currMemoizedState).toStrictlyEqual([{},{},{text: 'test1', complete: 'false'}]);
        // expect(MemoizedStateDiff).toStrictlyEqual([{text: 'test1', complete: 'false'}])
      });
    });
    `;
  }

  return describeBlock;

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