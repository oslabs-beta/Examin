// Edits to the codepanel still copy!

describe('State Initializes', () => {
  let state;

  beforeEach(() => {
    state = [{"text":"Walk the dog","complete":true},{"text":"Write app","complete":false}];
  });

  it('should return a default state when given an undefined input', () => {
   expect(state[0]).toEqual({"text":"Walk the dog","complete":true});
   expect(state[1]).toEqual({"text":"Write app","complete":false});
   expect(state).toEqual(
      [{"text":"Walk the dog","complete":true},{"text":"Write app","complete":false}]
    );
  });
});

describe('Adds to State', () => {
  let prevState, currState, stateDiff;

  beforeEach(() => {
    prevState = [{"text":"Walk the dog","complete":true},{"text":"Write app","complete":false}];
    currState = [{"text":"Walk the dog","complete":true},{"text":"Write app","complete":false},{"text":"test","complete":false}];
    stateDiff = {"added":{"2":{"text":"test","complete":false}},"deleted":{},"updated":{}};
  });

  it('prevMemoizedState should not equal currMemoizedState', () => {
    expect(prevState).not.toEqual(currState);
  });
  it('should useStateHook variable where component changed', () => {
    expect(currState).toEqual([{"text":"Walk the dog","complete":true},{"text":"Write app","complete":false},{"text":"test","complete":false}]);
    expect(stateDiff).toEqual({"added":{"2":{"text":"test","complete":false}},"deleted":{},"updated":{}});
  });
});

describe('State Updates', () => {
  let prevState, currState, stateDiff;

  beforeEach(() => {
    prevState = [{"text":"Walk the dog","complete":true},{"text":"Write app","complete":false},{"text":"test","complete":false}];
    currState = [{"text":"Walk the dog","complete":true},{"text":"Write app","complete":false},{"text":"test","complete":true}];
    stateDiff = {"added":{},"deleted":{},"updated":{"2":{"complete":true}}};
  });

  it('prevMemoizedState should not equal currMemoizedState', () => {
    expect(prevState).not.toEqual(currState);
  });
  it('should useStateHook variable where component changed', () => {
    expect(currState).toEqual([{"text":"Walk the dog","complete":true},{"text":"Write app","complete":false},{"text":"test","complete":true}]);
    expect(stateDiff).toEqual({"added":{},"deleted":{},"updated":{"2":{"complete":true}}});
  });
});