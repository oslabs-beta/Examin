interface componentChildInfo {
    componentName : string;
}

interface htmlChildInfo {
    innerText: string;
    elementType: string;
}

interface componentInfo {
    name: string;
    fileName: string;
    props: object;
    componentChildren: Array<componentChildInfo>;
    htmlChildren: Array<htmlChildInfo>;
}

const getComponentName = (node) => {
	return node.elementType.name;
};

const getComponentFileName = (node, rootDirectory) => {
	if (!node.child || !node.child._debugSource) {
		return '<ADD FILE PATH>';
	}
	let regex = /\\/g
	let fileName = node.child._debugSource.fileName;
	// let scopesTest = '[[Scopes]]';
	// let fileName = node.elementType[2].module.i;
	// console.log('Scope', fileName);
	// return fileName;
	if (rootDirectory === '') {
		fileName = fileName.replace(regex, '/');
		return fileName;
	}
	if (fileName.includes(rootDirectory)) {
		const indexOfFirst = fileName.indexOf(rootDirectory);
		const index = indexOfFirst + rootDirectory.length;
		fileName = fileName.replace(regex, '/');
		return '..' + fileName.slice(index);
	}
};

const grabComponentChildInfo = (node) => {
	const componentChildInfo : componentChildInfo = { 
        componentName: ''
    };
	componentChildInfo.componentName = node.elementType.name;
	return componentChildInfo;
};

const grabHtmlChildInfo = (node) => {
	const htmlChildInfo : htmlChildInfo = {
        innerText : '',
        elementType: ''
    };
	htmlChildInfo.innerText = '';
	htmlChildInfo.elementType = node.elementType;
	if (
		htmlChildInfo.elementType !== 'div' &&
		htmlChildInfo.elementType !== 'ul' 
		// && node.stateNode
	) {
		htmlChildInfo.innerText = node.stateNode.innerText;
	}
	return htmlChildInfo;
};

const getComponentInfo = (node, rootDirectory) => {
	const componentInfo : componentInfo = {
        name: '',
        fileName: '',
        props: {},
        componentChildren: [],
        htmlChildren: []
    };
	componentInfo.name = getComponentName(node);
	componentInfo.fileName = getComponentFileName(node, rootDirectory);
	componentInfo.props = node.memoizedProps;
	componentInfo.componentChildren = [];
	componentInfo.htmlChildren = [];

	const getComponentInfoHelper = (currNode) => {
		currNode = currNode.child;
		while (currNode !== null) {
			//some logic to fill out component/html children
			// If React Component
			if (currNode.elementType && currNode.elementType.name) {
				componentInfo.componentChildren.push(grabComponentChildInfo(currNode));

				// If html element
			} else if (currNode.elementType) {
				componentInfo.htmlChildren.push(grabHtmlChildInfo(currNode));
				getComponentInfoHelper(currNode);
			}
			currNode = currNode.sibling;
		}
	};

	getComponentInfoHelper(node);

	return componentInfo;
};

const treeTraversal = (node, rootDirectory) => {
	const testInfoArray : Array<componentInfo> = [];
	const treeHelper = (currNode) => {
		if (currNode === null || currNode.elementType === null) return;
		if (currNode.elementType.name) {
			testInfoArray.push(getComponentInfo(currNode, rootDirectory));
		} else {
		}
		currNode = currNode.child;
		// console.log('currNode after currNode.child reset', currNode);
		while (currNode !== null) {
			treeHelper(currNode);
			currNode = currNode.sibling;
		}
	};
	treeHelper(node);
	return testInfoArray;
};

export default treeTraversal;