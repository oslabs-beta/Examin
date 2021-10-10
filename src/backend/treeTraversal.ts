// function to acquire the file path from the users fibernode
const getComponentFileName = (node: FiberNode, rootDirectory: string) => {
  // if the file path is not accessible, return a default value for the user to fill in
  if (!node.child || !node.child._debugSource) {
    return "<ADD FILE PATH>";
  }
  // regex expression to remove backslashes with forward slashes in the file path
  const regex = /\\/g;
  // acquire the filepath from the passed in node
  let fileName: string = node.child._debugSource.fileName;
  // if the user has not input a root Directory or has input a root directory that is not included in the absolute filepath
  // return the absolute filepath
  if (rootDirectory === "" || !fileName.includes(rootDirectory)) {
    fileName = fileName.replace(regex, "/");
    return fileName;
  }
  //  if the user has input a filepath and the absolute filepath includes that filepath,
  // return .. followed by the path after the root directory (the relative filepath)

  const indexOfFirst = fileName.indexOf(rootDirectory);
  const index = indexOfFirst + rootDirectory.length;
  fileName = fileName.replace(regex, "/");
  return ".." + fileName.slice(index);
};

// function to acquire the information of react functional component children
const grabComponentChildInfo = (node: FiberNode) => {
  // initialize the object that will be returned
  const componentChildInfo: ComponentChildInfo = {
    componentName: "",
  };
  // assign the component name key of that object to the name of the passed in node
  componentChildInfo.componentName = node.elementType.name;
  return componentChildInfo;
};

// function to acquire the information of html component children
const grabHtmlChildInfo = (node: FiberNode) => {
  // initialize the object that will be returned
  const htmlChildInfo: HtmlChildInfo = {
    innerText: "",
    elementType: "",
  };
  // assign the elementType of the node to that key in the htmlChildInfo object
  htmlChildInfo.elementType = node.elementType;
  // conditional to check if the html component is a container which will include other components
  // If so, the innerText will not be used. This also needs to check if there is a statenode key, which is what stores the innerText
  if (
    htmlChildInfo.elementType !== "div" &&
    htmlChildInfo.elementType !== "ul" &&
    node.stateNode
  ) {
    htmlChildInfo.innerText = node.stateNode.innerText;
  }
  return htmlChildInfo;
};

// this function will be run whenever the treeTraversal algorithm finds a react functional component.
// It will generate an object which will correspond to a single describe block in the final examin panel
const getComponentInfo = (node: FiberNode, rootDirectory: string) => {
  // initialize the object that will be returned
  const componentInfo: ComponentInfo = {
    name: "",
    fileName: "",
    props: {},
    componentChildren: [],
    htmlChildren: [],
  };
  // assign the non-array elements of the object. These will not depend on the children of the node in any way
  componentInfo.name = node.elementType.name;
  componentInfo.fileName = getComponentFileName(node, rootDirectory);
  componentInfo.props = node.memoizedProps;

  // recursive helper function to dig through the children of the passed-in node and pull out the
  // function and html component children to populate the relevant arrays
  const getComponentInfoHelper = (currNode: FiberNode) => {
    // currNode to the child of the currNode argument. This will begin the process of looking through the child components.
    currNode = currNode?.child;
    // use a while loop to search through all children (the original child and all siblings) of the original currNode
    while (currNode !== null) {
      // Conditional to check if currNode is a react functional component
      if (currNode?.elementType && currNode?.elementType.name) {
        // there is no recursive call in this case. Because all of the tests are shallow renders we do not want this logic digging
        // further into functional component children
        componentInfo.componentChildren.push(grabComponentChildInfo(currNode));

        // Conditional to check if currNode is an html component
      } else if (currNode?.elementType) {
        componentInfo.htmlChildren.push(grabHtmlChildInfo(currNode));
        // We do want to dig further into any html children in order to generate all relevant tests.
        // Thus, there is a recursive call here
        getComponentInfoHelper(currNode);
      }
      currNode = currNode.sibling;
    }
  };
  // Call the recursive helper function, passing in the original node
  getComponentInfoHelper(node);

  return componentInfo;
};

// This function will loop through the entirety of the user's application's fiber tree
// in order to populate the array of objects the testGenerator function needs to create the tests
const treeTraversal: TreeTraversal = (fiberNode, rootDirectory) => {
  // Initialize the array of objects which will be returned
  const testInfoArray: Array<ComponentInfo> = [];
  // Recursive helper function to loop through all contents of the fibernode.
  // The fiber node is a tree shaped data structure in which each node may have an arbitrarily large number of children.
  // The first child of a node is node.child, the second is node.child.sibling, the third is node.child.sibling.sibling, and so on.
  const treeHelper = (currNode: FiberNode) => {
    // check if the current node is null or its elementType is null. If so, the function has reached the bottom
    // most element in that series of children and is finished
    if (currNode === null || currNode?.elementType === null) return;
    // check if the current node is a react functional component. If so, use the getComponentInfo function to pass
    // that node's information into the testInfoArray.
    if (currNode?.elementType.name) {
      testInfoArray.push(getComponentInfo(currNode, rootDirectory));
    }
    // reassign currNode to the child of the passed in node in order to begin digging through the tree
    currNode = currNode?.child;
    // while loop to look through the first child and all siblings of the passed in node
    while (currNode !== null) {
      // recursive call here to look through all children of each node, and their children etc.
      treeHelper(currNode);
      currNode = currNode.sibling;
    }
  };
  treeHelper(fiberNode);
  return testInfoArray;
};

export default treeTraversal;
