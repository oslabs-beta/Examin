// import { prevMemoizedState, currMemoizedState, MemoizedStateDiff } from './injected.js';




// INPUT needed: 
// @param prevMemoizedState :  
// @param currMemoizedState : 
// @param MemoizedStateDiff :

// OUTPUT: describe string that continually gets concatenated, until user clicks download or save 

function stateChanges(currMemoizedState: object, prevMemoizedState = null, MemoizedStateDiff = null) {
  let describeBlock: string = '';

  // Conditional (on initial): check if prevMemoizedState and MemoizedStateDiff is null
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

  // Else (not-initial)
    describeBlock += `
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




  // let describeString = `describe('TODOS state changes', () => {${describeBlock}});`
  
  // fsWriteFileSync the describeString

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