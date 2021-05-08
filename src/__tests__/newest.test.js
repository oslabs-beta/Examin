import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import App from '../src/App';
import { TodoList } from '../src/TodoList';
import { TodoListItem } from '../src/TodoListItem';
import { AddTodoForm } from '../src/AddTodoForm';

// import <Component> from '<insert file path>';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
	let props;
	let mockToggleComplete = jest.fn();

	//	input: array of objects
	//	objects contain information required to generate tests for each component
	//	input =
	//	[
	// 		{
	// 			name: "<App>",
	// 			componentChildren: [
	//		  	{
	//	 				componentName: "<TodoList>",
	//					componentIndex: 0,
	//  			},
	// 			]
	// 			htmlChildren: [
	// 				{
	// 					elementType: 'li',
	// 					innerHtml: 'Walk the dog',
	//					elementIndex: 0
	// 				},
	//  			{
	// 					elementType: 'li',
	// 					innerHtml: 'Second item',
	//					elementIndex: 1,
	// 				}
	//			 ]
	// 			props: []
	// 		}
	// 	]

	// output:
	// component name
	// expect(wrap.find('li').at([index of the object])).toEqual('Walk the dog');

	describe('App Component', () => {
		const wrapper = shallow(<App />);

		beforeEach(() => {});

		it('Contains TodoList component', () => {
			// const wrapper = shallow(<App />);
			// expect(wrapper.find(TodoList)).to.have.lengthOf(1);
			expect(wrapper.find(TodoList).length).toBe(1);
			// expect(wrapper.find(AddTodoForm).length).toBe(1);
		});

		it('Contains AddTodoForm component', () => {
			// const wrapper = shallow(<App />);
			// expect(wrapper.find(TodoList)).to.have.lengthOf(1);
			// expect(wrapper.find(TodoList).length).toBe(1);
			expect(wrapper.find(AddTodoForm).length).toBe(1);
		});

		it('should update state on click', () => {
			const updateState = jest.fn();
			const wrapper = mount(<App onClick={updateState} />);
			const handleClick = jest.spyOn(React, 'useState');
			handleClick.mockImplementation((size) => [size, updateState]);

			// Specify element type and index to test state change
			// wrapper.find(<element type>).at(1).simulate('click');
			wrapper.find('input').at(1).simulate('click');
			expect(updateState).toBeTruthy();
		});
	});

	describe('TodoList Component', () => {
		beforeEach(() => {
			props = {
				todos: [
					{ text: 'Walk the dog', complete: true },
					{ text: 'Make app', complete: false },
					// { text: 'test', complete: false },
				],
				toggleComplete: mockToggleComplete,
			};
		});

		it('includes two list items', () => {
			const wrap = mount(<TodoList {...props} />);
			expect(wrap.find('li').length).toEqual(props.todos.length);
		});
	});

	describe('TodoListItem Component', () => {
		beforeEach(() => {
			props = {
				todo: { text: 'Walk the dog', complete: true },
				toggleComplete: mockToggleComplete,
			};
		});

		it('contains input (checkbox)', () => {
			const wrap = mount(<TodoListItem {...props} />);
			expect(wrap.find('input').length).toEqual(1);
		});
	});
});
