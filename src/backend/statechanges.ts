//define the interface for the memoizedStateDiff object, which will be an object with 3 key-value pairs
interface MemStateObject {
	added: object;
	deleted: object;
	updated: object;
}


// stateChanges accepts 1 required parameter and 4 default parameters
// INPUT needed:
// @param prevMemoizedState : [{}, {}]
// @param currMemoizedState : [{}, {}]
// @param MemoizedStateDiff : {added: {}, deleted: {}, updated: {}}
// OUTPUT: [] = array of describe strings that continually gets concatenated, until user clicks download or save
// firstInvocation tracks if it is the first invocation of stateChanges()
// describeBlockArray contains array of describe block strings
export default function stateChanges(
	currMemoizedState: Array<object>,
	prevMemoizedState: Array<object> = null,
	memoizedStateDiff: MemStateObject = null, 
	firstInvocation: boolean = true,
	describeBlockArray: Array<string> = []
) {
	// On first invocation of stateChanges, generate test for default initalized state. reassign firstInvocation to false
	if (firstInvocation === true) {
		let initialState: string = '';

    // currMemoizedState = [{"text":"Walk the dog","complete":true},{"text":"Write app","complete":false}]
    currMemoizedState.forEach((element, index) => {
      initialState += `   expect(state[${index}]).toEqual(${JSON.stringify(element)});\n`;
    });

		// add test for default state to describeBlockArray
		describeBlockArray.push(`
describe('State Initializes', () => {
  let state;

  beforeEach(() => {
    state = ${JSON.stringify(currMemoizedState)};
  });

  it('should return a default state when given an undefined input', () => {
${initialState}   expect(state).toEqual(
      ${JSON.stringify(currMemoizedState)}
    );
  });
});
`
);
		firstInvocation = false;

		// Else if not first invocation of stateChanges, ...
	} else {

    let describeString: string = ''
    if (Object.keys(memoizedStateDiff.added).length !== 0) describeString = 'Adds to State'
    if (Object.keys(memoizedStateDiff.updated).length !== 0) describeString = 'State Updates'
    if (Object.keys(memoizedStateDiff.deleted).length !== 0) describeString = 'Deletes from State'

		// add state changed test to describeBlockArray
		//non-initial
		describeBlockArray.push(`
describe('${describeString}', () => {
  let prevState, currState, stateDiff;

  beforeEach(() => {
    prevState = ${JSON.stringify(prevMemoizedState)};
    currState = ${JSON.stringify(currMemoizedState)};
    stateDiff = ${JSON.stringify(memoizedStateDiff)};
  });

  it('prevMemoizedState should not equal currMemoizedState', () => {
    expect(prevState).not.toEqual(currState);
  });
  it('should useStateHook variable where component changed', () => {
    expect(currState).toEqual(${JSON.stringify(currMemoizedState)});
    expect(stateDiff).toEqual(${JSON.stringify(memoizedStateDiff)});
  });
});
`
  );
	}
	// console.log('describeBlockArray:', describeBlockArray);
	return describeBlockArray;
}