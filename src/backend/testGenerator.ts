const initialImportString = `import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

`;

const fileNameImports = (componentName: string, fileName: string) => {
  return `import ${componentName} from '${fileName}';
`;
};

const describeBlockGen = (componentName: string) => {
  return `
describe('${componentName} Component', () => {`;
};

const mockfnGen = (key: string) => {
  return `
  let mock${key} = jest.fn();`;
};

const propsGen = (componentName: string, propsStr: string) => {
  return `
  let ${componentName}Props = ${propsStr};
  `;
};

const shallowNoProps = (componentName: string) => {
  return `
  const wrapper = shallow(<${componentName} />);
  `;
};

const shallowWithProps = (componentName: string) => {
  return `
  const wrapper = shallow(<${componentName} {...${componentName}Props} />);
  `;
};

const componentItGen = (key: string, childFreqKey: string) => {
  return `
  it('Contains ${key} component', () => {
    expect(wrapper.find(${key}).length).toBe(${childFreqKey})
  })
  `;
};

const htmlCountItGen = (componentName: string) => {
  return `
  it('${componentName} includes html elements', () => {`;
};

const htmlCountFindGen = (key: string, htmlFreqKey: string) => {
  return `
    expect(wrapper.find('${key}').length).toEqual(${htmlFreqKey});`;
};

const htmlInnertextItGen = (componentName: string) => {
  return `
  it('${componentName} includes correct html innerText', () => {`;
};

const htmlInnertextFindGen = (elementType: string, innerText: string) => {
  return `
    expect(wrapper.find('${elementType}').text()).toEqual(${innerText});`;
};

const endWithLineBreak = `
  });
`;

const endWithoutLineBreak = `
  });`;

const finalEnd = ` 
});
`;

const testGenerator: TestGenerator = (componentData) => {
  const describeBlockArray = [];
  // --------- Create and fill the frequency table ---------
  // Initialize a cache object to check frequency of names
  const nameFreq = {};
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

  describeBlockArray.push(initialImportString);

  // Initialize an object to check if component has been added to describeBlock already
  const componentHasBeenAdded = {};
  for (let i = 0; i < componentData.length; i++) {
    if (!componentHasBeenAdded[componentData[i].name]) {
      componentHasBeenAdded[componentData[i].name] = true;
      describeBlockArray.push(
        fileNameImports(componentData[i].name, componentData[i].fileName)
      );
    }
  }

  // Iterate through the componentData and generate the initial component render tests
  for (let i = 0; i < componentData.length; i++) {
    // Push the initialization describe string into describeBlockArray
    describeBlockArray.push(describeBlockGen(componentData[i].name));
    // Initialize a currentProps variable
    const currentProps = componentData[i].props;
    // Initialize a tempProps variable
    const tempProps = {};

    // Conditional: check if the current element has props (length not equal to zero)
    if (Object.keys(currentProps).length !== 0) {
      // Enumerate through the props object
      for (const key in currentProps) {
        tempProps[key] = currentProps[key];
        // Conditional: check if the type of the current key is a function
        if (typeof currentProps[key] === "function") {
          // Push an initialization for the props functions into the describeBlock
          describeBlockArray.push(mockfnGen(key));
          tempProps[key] = `mock${key}`;
        }
      }
      // Push the current element's props into the describeBlock
      // console.log("temp props log: ", tempProps);

      const replacerFunc = () => {
        const visited = new WeakSet();
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (visited.has(value)) {
              return;
            }
            visited.add(value);
          }
          return value;
        };
      };

      try {
        console.log(
          "strigified props",
          JSON.stringify(currentProps, replacerFunc())
        );
        // `
        // );
        describeBlockArray.push(
          propsGen(
            componentData[i].name,
            JSON.stringify(tempProps, replacerFunc())
          )
        );
      } catch (error) {
        console.log(error);
      }
    }

    // Conditional: check if the current element has componentComponent children of length > 0
    if (Object.keys(componentData[i].props).length > 0) {
      // If so, push the mount component describe string into describeBlockArray
      describeBlockArray.push(shallowWithProps(componentData[i].name));
    } else {
      describeBlockArray.push(shallowNoProps(componentData[i].name));
    }

    // }
    // ----------- Construct Render Tests --------------------------
    // Initialize a cache object to check frequency of child components
    const childFreq = {};
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
    // Conditional: check if childFreq is not empty
    if (Object.keys(childFreq).length !== 0) {
      // Enumerate through childFreq
      for (const key in childFreq) {
        describeBlockArray.push(componentItGen(key, childFreq[key]));
      }
    }

    // Initialize a cache object to check frequency of child components
    const htmlFreq = {};
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

    // Conditional: check if htmlChildren length is not 0
    if (componentData[i].htmlChildren.length !== 0) {
      describeBlockArray.push(htmlCountItGen(componentData[i].name));
      // Enumerate through the htmlFreq object
      for (const key in htmlFreq) {
        describeBlockArray.push(htmlCountFindGen(key, htmlFreq[key]));
      }
      describeBlockArray.push(endWithLineBreak);

      if (componentData[i].htmlChildren.some((el) => el.innerText !== "")) {
        describeBlockArray.push(htmlInnertextItGen(componentData[i].name));
        // Iterate through the htmlChildren array
        for (let j = 0; j < componentData[i].htmlChildren.length; j++) {
          // Conditional: check if htmlChildren.innerText is not an empty string or undefined
          if (
            componentData[i].htmlChildren[j].innerText !== "" &&
            componentData[i].htmlChildren[j].innerText !== undefined
          ) {
            if (htmlFreq[componentData[i].htmlChildren[j].elementType] === 1) {
              let innerTextStr: string = JSON.stringify(
                componentData[i].htmlChildren[j].innerText
              );
              // regex to remove new line characters from each string
              const regex = /\\n/g;
              if (innerTextStr) {
                innerTextStr = innerTextStr.replace(regex, "");
              }
              describeBlockArray.push(
                htmlInnertextFindGen(
                  componentData[i].htmlChildren[j].elementType,
                  innerTextStr
                )
              );
            }
          }
        }
        describeBlockArray.push(endWithoutLineBreak);
      }
    }

    // Closing the describeBlock
    describeBlockArray.push(finalEnd);
  } // Closing the current element componentData for loop
  // Return the describeBlockArray
  return describeBlockArray;
};

export default testGenerator;
