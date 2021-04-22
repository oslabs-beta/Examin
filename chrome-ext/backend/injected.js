console.log('Currently in injected.js');

// console.log('logging window --------------');
// console.log(window)

// console.log('REACT DEVTOOLS GLOBAL HOOK');
// console.log(window.__REACT_DEVTOOLS_GLOBAL_HOOK__);

// WHERE THE LOGIC TO MANIPULATE __REACT_DEVTOOLS_GLOBAL_HOOK__
// commit change

const dev = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

// console.log(dev);

dev.onCommitFiberRoot = (function (original) {
  return function (...args) {

    // console.log('logging from onCommitFiberRoot!!');
    
    const fiberNode = args[1].current.child;
    // console.log('This is the fiberNode(args[1].current.child): ', fiberNode);
    
    console.log('This is the fiberNode.memoizedState: ', fiberNode.memoizedState);
    // console.log('This is the fiberNode.child.memoizedState: ', fiberNode.child.memoizedState);
    
    // console.log('Logging dev.onCommitFiberRoot: ', dev.onCommitFiberRoot);
    // console.log('logging args: ', args)


    // CONDITIONAL: IF STATE CHANGED
      // THEN add to Linked List


  };
})(dev.onCommitFiberRoot);

// const hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
// const oldHook = {...dev};
// dev.onCommitFiberRoot = (...args) => {
//     // custom code here
    

    
//     oldHook.onCommitFiberRoot(...args);
// };


// const testFunc = function (original) {
//   return function (...args){
//     console.log('Logging dev.onCommitFiberRoot: ', dev.onCommitFiberRoot);

//     // PULL OUT STATE FUNCTION

//   };
// }

// // On each commit to the fiber root node?
// dev.onCommitFiberRoot = (testFunc)(dev.onCommitFiberRoot)
