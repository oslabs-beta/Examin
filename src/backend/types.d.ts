type componentChildInfo = {
    componentName : string;
}

type htmlChildInfo = {
    innerText: string;
    elementType: string;
}

type componentInfo = {
    name: string;
    fileName: string;
    props: object;
    componentChildren: Array<componentChildInfo>;
    htmlChildren: Array<htmlChildInfo>;
}

type node = {
	elementType :  any;
	child : node;
	sibling : node;
	_debugSource : {
		fileName: string;
	}
	memoizedProps : object;
	stateNode : {
		innerText : string;
	}
}