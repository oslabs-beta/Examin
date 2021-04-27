// Demo test for Examin
// Tests react-typescript-todo-app

// Initial describe statement for default initialized state
describe('default state', () => {
	let state;

	beforeEach(() => {
		state = [
			{ text: 'Walk the dog', complete: true },
			{ text: 'Make app', complete: false },
		];
	});

	it('should return a default state when given an undefined input', () => {
		expect(state[0]).toEqual({
			text: 'Walk the dog',
			complete: true,
		});
		expect(state[1]).toEqual({ text: 'Make app', complete: false });
		expect(state).toEqual([
			{ text: 'Walk the dog', complete: true },
			{ text: 'Make app', complete: false },
		]);
	});
});

// Added a todo!
describe('state changed!', () => {
	let prevState, currState, stateDiff;

	beforeEach(() => {
		prevState = [
			{ text: 'Walk the dog', complete: true },
			{ text: 'Make app', complete: false },
		];
		currState = [
			{ text: 'Walk the dog', complete: true },
			{ text: 'Make app', complete: false },
			{ text: 'Create tests', complete: false },
		];
		stateDiff = { text: 'Create tests', complete: false };
	});

	it('prevMemoizedState should not equal currMemoizedState', () => {
		expect(prevState).not.toEqual(currState);
	});
	it('should useStateHook variable where component changed', () => {
		expect(currState).toEqual([
			{ text: 'Walk the dog', complete: true },
			{ text: 'Make app', complete: false },
			{ text: 'Create tests', complete: false },
		]);
		expect(stateDiff).toEqual({
			text: 'Create tests',
			complete: false,
		});
	});
});
