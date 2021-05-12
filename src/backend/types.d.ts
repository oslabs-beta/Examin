type ComponentChildInfo = {
    componentName : string;
}

type HtmlChildInfo = {
    innerText: string;
    elementType: string;
}

// any types are used when those values are pulled from the user's page and can have different shapes

type ComponentInfo = {
    name: string;
    fileName: string;
    props: any;
    componentChildren: Array<ComponentChildInfo>;
    htmlChildren: Array<HtmlChildInfo>;
}

type FiberNode = {
	elementType :  any;
	child : FiberNode;
	sibling : FiberNode;
	_debugSource : {
		fileName: string;
	}
	memoizedProps : any;
	memoizedState: any;
	stateNode : {
		innerText : string;
	}
	next: FiberNode;
} 

type TreeTraversal = ( fiberNode : FiberNode, rootDirectory : string) => Array<ComponentInfo>

type TestGenerator = ( componentData: Array<ComponentInfo> ) => Array<string>