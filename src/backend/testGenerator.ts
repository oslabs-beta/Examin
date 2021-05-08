interface ComponentChildrenObject {
	componentName: string;
	componentIndex: number;
}

interface ComponentInfoObject {
	name: string;
	fileName: string;
	componentChildren: Array<ComponentChildrenObject>;
	htmlChildren: any;
	props: Array<object>;
}

export default function testGenerator(
	componentData: Array<ComponentInfoObject>,
	describeBlockArray: Array<string> = []
) {
	// --------- Create and fill the frequency table ---------
	// Initialize a cache object to check frequency of names
	const nameFreq: object = {};
	// Iterate through the componentData object and fill the nameFreq object
	for (let i = 0; i < componentData.length; i++) {
		// Conditional: check if the name already is in the object
		if (componentData[i].name in nameFreq) {
			// If so, increment the freq of that element by 1
			nameFreq[componentData[i].name] += 1;
			// Else, assign to 1
		} else {
			nameFreq[componentData[i].name] = 1;
		}
	}
	// nameFreq = { "App": 1, "TodoList": 1, "TodoListItem": 2, "AddTodoForm": 1 } // This every component
	// ---------------------------------------------------------

	describeBlockArray.push(`import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

`);

	// Initialize an object to check if component has been added to describeBlock already
	let componentHasBeenAdded = {};
	for (let i = 0; i < componentData.length; i++) {
		if (!componentHasBeenAdded[componentData[i].name]) {
			componentHasBeenAdded[componentData[i].name] = true;
			describeBlockArray.push(`import ${componentData[i].name} from '${componentData[i].fileName}';
`);
		}
	}

	// Iterate through the componentData and generate the initial component render tests
	for (let i = 0; i < componentData.length; i++) {
		// if (!componentHasBeenAdded[componentData[i].name]) {
		//   componentHasBeenAdded[componentData[i].name] = true;
		// Push the initialization describe string into describeBlockArray
		describeBlockArray.push(`
describe('${componentData[i].name} Component', () => {`);
		// Initialize a currentProps variable
		let currentProps = componentData[i].props;
		// Initialize a tempProps variable
		let tempProps = {};

		// Conditional: check if the current element has props (length not equal to zero)
		if (Object.keys(currentProps).length !== 0) {
			// Enumerate through the props object
			for (const key in currentProps) {
				tempProps[key] = currentProps[key];
				// Conditional: check if the type of the current key is a function
				if (typeof currentProps[key] === 'function') {
					// Push an initialization for the props functions into the describeBlock
					describeBlockArray.push(`
  let mock${key} = jest.fn();`);
					tempProps[key] = `mock${key}`;
				}
			}
			// Push the current element's props into the describeBlock
			//         describeBlockArray.push(`
			//   let ${componentData[i].name}Props = ${JSON.stringify(componentData[i].props)}
			console.log('temp props log: ', tempProps);
			// console.log('strigified props', JSON.stringify(currentProps));
			// `
			// );
			describeBlockArray.push(`
  let ${componentData[i].name}Props = ${JSON.stringify(tempProps)};
`);
		}

		// Conditional: check if the current element has componentComponent children of length > 0
		if (Object.keys(componentData[i].props).length > 0) {
			// If so, push the mount component describe string into describeBlockArray
			describeBlockArray.push(`
  const wrapper = shallow(<${componentData[i].name} {...${componentData[i].name}Props} />);
`);
		} else if (componentData[i].componentChildren.length > 0) {
			describeBlockArray.push(`
  const wrapper = shallow(<${componentData[i].name} />);
`);
			// Else, push the shallow mount component describe string into describeBlockArray
		} else {
			describeBlockArray.push(`
  const wrapper = shallow(<${componentData[i].name} />);
`);
		}

		// }
		// ----------- Construct Render Tests --------------------------
		// Initialize a cache object to check frequency of child components
		let childFreq: object = {};
		// Iterate through the componentData.componentChildren and fill the childFreq object
		for (let j = 0; j < componentData[i].componentChildren.length; j++) {
			// Conditional: check if the name already is in object
			if (componentData[i].componentChildren[j].componentName in childFreq) {
				// If so, increment the freq of that element by 1
				childFreq[componentData[i].componentChildren[j].componentName] += 1;
				// Else, assign to 1
			} else {
				childFreq[componentData[i].componentChildren[j].componentName] = 1;
			}
		}
		// childFreq(for App element) = {"TodoList": 1, "AddTodoForm": 1}
		// console.log('childFreq', childFreq)
		// );
		// Conditional: check if childFreq is not empty
		if (Object.keys(childFreq).length !== 0) {
			// Enumerate through childFreq
			for (const key in childFreq) {
				describeBlockArray.push(`
  it('Contains ${key} component', () => {
    expect(wrapper.find(${key}).length).toBe(${childFreq[key]})
  })
`);
			}
		}

		// Initialize a cache object to check frequency of child components
		let htmlFreq: object = {};
		// Iterate through the componentData.componentChildren and fill the childFreq object
		for (let j = 0; j < componentData[i].htmlChildren.length; j++) {
			// Conditional: check if the name already is in object
			if (componentData[i].htmlChildren[j].elementType in htmlFreq) {
				// If so, increment the freq of that element by 1
				htmlFreq[componentData[i].htmlChildren[j].elementType] += 1;
				// Else, assign to 1
			} else {
				htmlFreq[componentData[i].htmlChildren[j].elementType] = 1;
			}
		}
		// console.log('htmlFreq', htmlFreq)

		// Conditional: check if htmlChildren length is not 0
		if (componentData[i].htmlChildren.length !== 0) {
			describeBlockArray.push(`
  it('${componentData[i].name} includes html elements', () => {`);
			// Enumerate through the htmlFreq object
			for (const key in htmlFreq) {
				describeBlockArray.push(`
    expect(wrapper.find('${key}').length).toEqual(${htmlFreq[key]});`);
			}
			describeBlockArray.push(`
  });
  `);

			if (componentData[i].htmlChildren.some((el) => el.innerText !== '')) {
				describeBlockArray.push(`
  it('${componentData[i].name} includes correct html innerText', () => {`);
				// Iterate through the htmlChildren array
				for (let j = 0; j < componentData[i].htmlChildren.length; j++) {
					// Conditional: check if htmlChildren.innerText is not an empty string
					if (componentData[i].htmlChildren[j].innerText !== '') {
						// Conditional: check if there's only one instance of the element
						// if (htmlFreq[componentData[i].htmlChildren[j].elementType] === 1) {
						let innerTextStr: string = JSON.stringify(
							componentData[i].htmlChildren[j].innerText
						);
						let regex = /\\n/g;
						innerTextStr = innerTextStr.replace(regex, '');
						describeBlockArray.push(`
    expect(wrapper.find('${componentData[i].htmlChildren[j].elementType}').text()).toEqual(${innerTextStr});`);
						// }
					}
				}
				describeBlockArray.push(`
  });`);
			}
		}

		// Closing the describeBlock
		describeBlockArray.push(`
});
`);
	} // Closing the current element componentData for loop
	// Return the describeBlockArray
	return describeBlockArray;
}
