//	input: array of objects
//	objects contain information required to generate tests for each component
//	componentData =
//	[
// 		{
// 			name: "App",
// 			componentChildren: [
//		  	{
//	 				componentName: "TodoList",
//					componentIndex: 0,
//  			},
//        {
//          componentName: "AddTodoForm",
//          componentIndex: 0,
//        }
// 			],
// 			htmlChildren: [],
// 			props: {}
// 		},
//    {
//      name: "TodoList",
//      componentChildren: [
//        {
//          componentName: "TodoListItem",
//          componentIndex: 0
//        },
//        {
//          componentName: "TodoListItem",
//          componentIndex: 1
//        },
//      ],
//      htmlChildren: [
//        {
//          elementIndex: 0,
//          elementType: "ul"
//          innerText: "Walk the dog\nMakeapp"
//        },  
//      ],
//      props :{
//        todos: [
//          {
//            text: "Walk the dog",
//            complete: true
//          },
//          {
//            text: "Make app",
//            complete: false
//          }
//        ],
//        toggleComplete: function()
//      }
//    },
//    {
//      name: "TodoListItem",
//      componentChildren: [],
//      htmlChildren: [
//        {
// 					elementType: 'li',
// 					innerText: 'Walk the dog',
//					elementIndex: 0
// 				},
//      ],
//      props: {
//       todo: { text: 'Walk the dog', complete: true },
//       toggleComplete: function(),
//      }
//    },
//    {
//      name: "AddTodoForm",
//      componentChildren: [],
//      htmlChildren: [
//        {
//          elementType: 'form',
//          innerText: 'Add Todo',
//          elementIndex: 0
//        },
//        {
//          elementType: 'input',
//          innerText: '',
//          elementIndex: 0
//        },
//        {
//          elementType: 'button',
//          innerText: 'Add Todo',
//          elementIndex: 0
//        },
//      ],
//      props: {
//        addTodo: function()
//      },
//    }
// 	]

// 				
//			

// Input: [{name: "App"},{name:"TodoList"},{name:"AddTodoForm"},...]
// Input: [{name: "App"},{name:"TodoList"},{name:"TodoList"},{name:"AddTodoForm"}]

interface ComponentChildrenObject {
	componentName: string;
	componentIndex: number;
}

interface ComponentInfoObject {
	name: string;
 // fileName: string;
	componentChildren: Array<ComponentChildrenObject>;
	htmlChildren: any;
	props: Array<object>;
}

export default function testGenerator(
  componentData: Array<ComponentInfoObject>,
  describeBlockArray: Array<string> = [],
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

    // Initialize an object to check if component has been added to describeBlock already
    // let componentHasBeenAdded = {}; 

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
  console.log('temp props log: ', tempProps)
  console.log('strigified props', JSON.stringify(currentProps))
  // `
  // );
          describeBlockArray.push(`
  let ${componentData[i].name}Props = ${JSON.stringify(tempProps)};
`
);
        } 

        // Conditional: check if the current element has componentComponent children of length > 0
        if (Object.keys(componentData[i].props).length > 0) {
          // If so, push the mount component describe string into describeBlockArray
          describeBlockArray.push(`
  const wrapper = mount(<${componentData[i].name} {...${componentData[i].name}Props} />);
`
);
        } else if (componentData[i].componentChildren.length > 0) {
    describeBlockArray.push(`
  const wrapper = mount(<${componentData[i].name} />);
`
);
        // Else, push the shallow mount component describe string into describeBlockArray
        } else {
          describeBlockArray.push(`
  const wrapper = shallow(<${componentData[i].name} />);
`
);
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
`
);
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
  });`)
      }



      // Closing the describeBlock
      describeBlockArray.push(`
});
`
);
    } // Closing the current element componentData for loop




    // -----------------------------------------------------------------------------

    // --------- Create the initial parent/child component tests --------------
    // Iterate through the componentData and generate the initial component render tests
//     for (let i = 0; i < componentData.length; i++) {
//       // Conditional: check if the current element has componentComponent children of length > 0
//       // If so, mount the component, else shallow mount
//       if (componentData[i].componentChildren.length > 0) {
//         // If so, push the initial describe string into describeBlockArray
//         describeBlockArray.push(`
// describe('${componentData[i].name} Component', () => {
//   const wrapper = mount(<${componentData[i].name} />);

// `
// );
//         // Should we check if the parent-most component (<App />) h as props?
//         // if (Object.keys().length !== 0)

//         // Initialize an object that tracks if it's been added to the describeBlock already
//         const componentHasBeenAdded: object = {};
//         // Iterate through the first element's componentChildren
//         for (let j = 0; j < componentData[i].componentChildren.length; j++) {
//           // Initialize a currChild variable to keep track of the current element
//           let currChild = componentData[i].componentChildren[j].componentName;
//           // Conditional: check if component has not been added
//           if (!componentHasBeenAdded[currChild]) {
//           // If so, push the describe strings with the componentChildren names
//             describeBlockArray.push(`
//   it('Contains ${currChild} child component', () => {
//     expect(wrapper.find(${currChild}).length).toBe(${nameFreq[currChild]});
//   });
// `
// );
//             // Add the currentChild to the componentHasBeenAdded object
//             componentHasBeenAdded[currChild] = true;
//           }
//         }
//         // Close out the describeBlock string
//         describeBlockArray.push(`
// });

// `
// );
//       // Else, not the first element (not the parent-most component)
//       } else {
//         // Initialize the describeBlock for the current element in componentData
//         describeBlockArray.push(`
// describe('${componentData[i].name} Component', () => {
// `
// );
//         // Initialize a currentProps variable
//         let currentProps: object = componentData[i].props;
//         // Conditional: check if the current element has props (length not equal to zero)
//         if(Object.keys(currentProps).length !== 0) {
//           // Push an initialization for the props variable into the describeBlock
//           describeBlockArray.push(`
//   let ${componentData[i].name}Props;
// `
// );
//           // Enumerate through the props object
//           for (const key in currentProps) {
//             // Conditional: check if the type of the current key is a function
//             if (typeof currentProps[key] === 'function') {
//               // Push an initialization for the props functions into the describeBlock
//               describeBlockArray.push(`
//   let mock${currentProps[key]} = jest.fn();

// `
// );
//             }
//           }

//           // Push the beforeEach initialization into the describeBlock
//           describeBlockArray.push(`
//   ${componentData[i].name}Props = {
// `
// );
//       }
//     }
    // ------------------------------------------------------------------------


    // describe('App Component', () => {
    //   let props;
    //   const wrapper = shallow(<App {...props} />);
    // 
    //   beforeEach(() => {
    //     props = {}
    //   });
    // 
    //   it('Contains TodoList component', () => {
    //     expect(wrapper.find(TodoList).length).toBe(1);
    //   });
    // 
    //   it('Contains AddTodoForm component', () => {
    //     expect(wrapper.find(AddTodoForm).length).toBe(1);
    //   });
    // });

    // describe('TodoList Component', () => {
    //   let TodoListProps;
    //   let mockToggleComplete = jest.fn(); 
    //
    //   beforeEach(() => {
    //     TodoListProps = {
    //       todos: [
    //         { text: 'Walk the dog', complete: true },
    //         { text: 'Make app', complete: false },
    //       ],
    //       toggleComplete: mockToggleComplete,
    //     };
    //   });
  
    //   it('includes two list items', () => {
    //     const wrap = mount(<TodoList {...TodoListProps} />);
    //     expect(wrap.find('li').length).toEqual(TodoListProps.todos.length);
    //   });
    // });

    // describe('TodoList Component', () => {
    //   let mockToggleComplete = jest.fn(); 
    //   let TodoListProps;
    //
    //   
  //     TodoListProps = {
  //       todos: [
  //         { text: 'Walk the dog', complete: true },
  //         { text: 'Make app', complete: false },
  //       ],
  //       toggleComplete: mockToggleComplete,
  //     };
  
    //   it('includes two list items', () => {
    //     const wrap = mount(<TodoList {...TodoListProps} />);
    //     expect(wrap.find('li').length).toEqual(TodoListProps.todos.length);
    //   });
    // });

    // describe('TodoListItem Component', () => {
    //   beforeEach(() => {
    //     props = {
    //       todo: { text: 'Walk the dog', complete: true },
    //       toggleComplete: mockToggleComplete,
    //     };
    //   });
  
    //   it('contains input (checkbox)', () => {
    //     const wrap = mount(<TodoListItem {...props} />);
    //     expect(wrap.find('input').length).toEqual(1);
    //   });
    // });

    // Push the initial describe test string into describeBlockArray


  // Return the describeBlockArray
  return describeBlockArray;
}