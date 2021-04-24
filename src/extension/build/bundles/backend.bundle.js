/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/backend/injected.js":
/*!*********************************!*\
  !*** ./src/backend/injected.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var deep_object_diff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! deep-object-diff */ \"./node_modules/deep-object-diff/dist/index.js\");\n/* harmony import */ var deep_object_diff__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(deep_object_diff__WEBPACK_IMPORTED_MODULE_0__);\nconsole.log('Currently in injected.js');\n // console.log('logging window --------------');\n// console.log(window)\n// console.log('REACT DEVTOOLS GLOBAL HOOK');\n// console.log(window.__REACT_DEVTOOLS_GLOBAL_HOOK__);\n// WHERE THE LOGIC TO MANIPULATE __REACT_DEVTOOLS_GLOBAL_HOOK__\n// Trying to convert to Typescript:\n// declare global {\n//   interface Window {\n//     __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;\n//   }\n// }\n\nvar dev = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;\nconsole.log('the dev ', dev); // console.log(dev);\n\nvar prevMemoizedState;\nvar currMemoizedState;\nvar MemoizedStateDiff;\nvar firstRun = true;\n\ndev.onCommitFiberRoot = function (original) {\n  return function () {\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    console.log('the args', args); // FiberRootNode.current.child.child.memoizedState\n\n    var fiberNode = args[1].current.child; // console.log('This is the fiberNode: ', fiberNode);\n    // console.log('This is the fiberNode(args[1].current.child): ', fiberNode);\n    // console.log('This is the fiberNode.child.memoizedState: ', fiberNode.child.memoizedState);\n    // console.log('Logging dev.onCommitFiberRoot: ', dev.onCommitFiberRoot);\n    // console.log('logging args: ', args);\n    // save memState\n    // To Do: account for apps that store state in fiberNode.memoizedState.memoizedState\n\n    var memState = fiberNode.child.memoizedState; // Conditional: check if memoizedState is on fiberNode\n    // If so, assign memState to fiberNode.memoizedState\n    // Else, assign memState to fiberNode.child.memoizedState\n    // // On first run\n\n    if (firstRun) {\n      currMemoizedState = memState;\n      console.log('first run memstate', memState);\n      firstRun = false; // stateChanges(currMemoizedState);\n      // Not first run\n    } else {\n      // Conditional: check if state changed\n      // If so, change currMemoizedState\n      prevMemoizedState = currMemoizedState; // currMemoizedState = memState;\n      // let MemoizedStateDiff = diffingAlgo(currMemoizedState, prevMemoizedState);\n      // stateChanges(prevMemoizedState, currMemoizedState, MemoizedStateDiff);\n    }\n  };\n}(dev.onCommitFiberRoot); // function diffingAlgo()\n// INPUT needed\n// @param prevMemoizedState :  \n// @param currMemoizedState : \n// OUTPUT:\n// @param MemoizedStateDiff : an object(s) that contain the difference in prevMemoizedState and currMemoizedState\n// -----------------------------------------------------------------------------------\n// -----------------------------------------------------------------------------------\n// Function to check for the differences in memoizedState --------------------------------------------\n// Case 1:\n// const prevMemoizedState = [{text: \"Walk the dog\", complete: true}, {text: \"Write app\", complete: false}, {text: \"test\", complete: false}]\n// const currMemoizedState = [{text: \"Walk the dog\", complete: true}, {text: \"Write app\", complete: false}, {text: \"test\", complete: true}]\n// Input the previous memoizedState and current memoizedState\n// Input: checkMemoizedStateDifferences(prevMemoizedState, currMemoizedState)\n// Output: {'state': {{text: \"test\", complete: true}}, 'changeType': 'update'} // the differences in memoizedState\n// Case 2:\n// const prevMemoizedState = [{text: \"Walk the dog\", complete: true}, {text: \"Write app\", complete: false}, {text: \"test\", complete: false}]\n// const currMemoizedState = [{text: \"Walk the dog\", complete: true}, {text: \"Write app\", complete: false}, {text: \"test\", complete: false}, {text: \"adding\", complete: false}]\n// Input the previous memoizedState and current memoizedState\n// Input: checkMemoizedStateDifferences(prevMemoizedState, currMemoizedState)\n// Output: {'state': [{text: \"adding\", complete: false}], 'changeType': 'added'}\n// Case 3:\n// const prevMemoizedState = [{text: \"Walk the dog\", complete: true}, {text: \"Write app\", complete: false}, {text: \"test\", complete: false}]\n// const currMemoizedState = []\n// Input the previous memoizedState and current memoizedState\n// Input: checkMemoizedStateDifferences(prevMemoizedState, currMemoizedState)\n// Output:  [{'state': [{text: \"Walk the dog\", complete: true}, {text: \"Write app\", complete: false}, {text: \"test\", complete: false}], 'changeType': 'removed'}]\n// Case 4:\n// const prevMemoizedState = []\n// const currMemoizedState = [{text: \"Walk the dog\", complete: true}, {text: \"Write app\", complete: false}, {text: \"test\", complete: false}]\n// Input the previous memoizedState and current memoizedState\n// Input: checkMemoizedStateDifferences(prevMemoizedState, currMemoizedState)\n// Output: {text: \"Walk the dog\", complete: true}, {text: \"Write app\", complete: false}, {text: \"test\", complete: false}\n// Assumptions (check if true): the currMemoizedState's difference will either be a single additional object or the object's property value \n// function checkMemoizedStateDifferences(prevMemoizedState, currMemoizedState) {\n//   // Conditional: Check if array lengths are different\n//   if (prevMemoizedState.length !== currMemoizedState.length) {\n//     // If so, return the new object\n//     return currMemoizedState[length - 1];\n//   // Else, the array lengths are the same\n//   } else {\n//     // Iterate through the currMemoizedState input array\n//     for (let i = 0; i < currMemoizedState.length; i++) {\n//       // Conditional: check if current element is NOT the same as the element in prevMemoizedState\n//       // If so, return the current element in currMemoizedState\n//       if (currMemoizedState[i] !== prevMemoizedState[i]) return currMemoizedState[i];\n//     }\n//   }\n//   // No Differences, Return null \n//   return null;\n// }\n// -----------------------------------------------------------------------------------------------------\n\n//# sourceURL=webpack://examin/./src/backend/injected.js?");

/***/ }),

/***/ "./node_modules/deep-object-diff/dist/added/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/deep-object-diff/dist/added/index.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! ../utils */ \"./node_modules/deep-object-diff/dist/utils/index.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (module, exports, _utils) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  function _defineProperty(obj, key, value) {\n    if (key in obj) {\n      Object.defineProperty(obj, key, {\n        value: value,\n        enumerable: true,\n        configurable: true,\n        writable: true\n      });\n    } else {\n      obj[key] = value;\n    }\n\n    return obj;\n  }\n\n  var _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  var addedDiff = function addedDiff(lhs, rhs) {\n\n    if (lhs === rhs || !(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return {};\n\n    var l = (0, _utils.properObject)(lhs);\n    var r = (0, _utils.properObject)(rhs);\n\n    return Object.keys(r).reduce(function (acc, key) {\n      if (l.hasOwnProperty(key)) {\n        var difference = addedDiff(l[key], r[key]);\n\n        if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference)) return acc;\n\n        return _extends({}, acc, _defineProperty({}, key, difference));\n      }\n\n      return _extends({}, acc, _defineProperty({}, key, r[key]));\n    }, {});\n  };\n\n  exports.default = addedDiff;\n  module.exports = exports['default'];\n});\n\n//# sourceURL=webpack://examin/./node_modules/deep-object-diff/dist/added/index.js?");

/***/ }),

/***/ "./node_modules/deep-object-diff/dist/deleted/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/deep-object-diff/dist/deleted/index.js ***!
  \*************************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! ../utils */ \"./node_modules/deep-object-diff/dist/utils/index.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (module, exports, _utils) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  function _defineProperty(obj, key, value) {\n    if (key in obj) {\n      Object.defineProperty(obj, key, {\n        value: value,\n        enumerable: true,\n        configurable: true,\n        writable: true\n      });\n    } else {\n      obj[key] = value;\n    }\n\n    return obj;\n  }\n\n  var _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  var deletedDiff = function deletedDiff(lhs, rhs) {\n    if (lhs === rhs || !(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return {};\n\n    var l = (0, _utils.properObject)(lhs);\n    var r = (0, _utils.properObject)(rhs);\n\n    return Object.keys(l).reduce(function (acc, key) {\n      if (r.hasOwnProperty(key)) {\n        var difference = deletedDiff(l[key], r[key]);\n\n        if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference)) return acc;\n\n        return _extends({}, acc, _defineProperty({}, key, difference));\n      }\n\n      return _extends({}, acc, _defineProperty({}, key, undefined));\n    }, {});\n  };\n\n  exports.default = deletedDiff;\n  module.exports = exports['default'];\n});\n\n//# sourceURL=webpack://examin/./node_modules/deep-object-diff/dist/deleted/index.js?");

/***/ }),

/***/ "./node_modules/deep-object-diff/dist/detailed/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/deep-object-diff/dist/detailed/index.js ***!
  \**************************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! ../added */ \"./node_modules/deep-object-diff/dist/added/index.js\"), __webpack_require__(/*! ../deleted */ \"./node_modules/deep-object-diff/dist/deleted/index.js\"), __webpack_require__(/*! ../updated */ \"./node_modules/deep-object-diff/dist/updated/index.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (module, exports, _added, _deleted, _updated) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _added2 = _interopRequireDefault(_added);\n\n  var _deleted2 = _interopRequireDefault(_deleted);\n\n  var _updated2 = _interopRequireDefault(_updated);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var detailedDiff = function detailedDiff(lhs, rhs) {\n    return {\n      added: (0, _added2.default)(lhs, rhs),\n      deleted: (0, _deleted2.default)(lhs, rhs),\n      updated: (0, _updated2.default)(lhs, rhs)\n    };\n  };\n\n  exports.default = detailedDiff;\n  module.exports = exports['default'];\n});\n\n//# sourceURL=webpack://examin/./node_modules/deep-object-diff/dist/detailed/index.js?");

/***/ }),

/***/ "./node_modules/deep-object-diff/dist/diff/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/deep-object-diff/dist/diff/index.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! ../utils */ \"./node_modules/deep-object-diff/dist/utils/index.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (module, exports, _utils) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  function _defineProperty(obj, key, value) {\n    if (key in obj) {\n      Object.defineProperty(obj, key, {\n        value: value,\n        enumerable: true,\n        configurable: true,\n        writable: true\n      });\n    } else {\n      obj[key] = value;\n    }\n\n    return obj;\n  }\n\n  var _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  var diff = function diff(lhs, rhs) {\n    if (lhs === rhs) return {}; // equal return no diff\n\n    if (!(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return rhs; // return updated rhs\n\n    var l = (0, _utils.properObject)(lhs);\n    var r = (0, _utils.properObject)(rhs);\n\n    var deletedValues = Object.keys(l).reduce(function (acc, key) {\n      return r.hasOwnProperty(key) ? acc : _extends({}, acc, _defineProperty({}, key, undefined));\n    }, {});\n\n    if ((0, _utils.isDate)(l) || (0, _utils.isDate)(r)) {\n      if (l.valueOf() == r.valueOf()) return {};\n      return r;\n    }\n\n    return Object.keys(r).reduce(function (acc, key) {\n      if (!l.hasOwnProperty(key)) return _extends({}, acc, _defineProperty({}, key, r[key])); // return added r key\n\n      var difference = diff(l[key], r[key]);\n\n      if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference) && !(0, _utils.isDate)(difference)) return acc; // return no diff\n\n      return _extends({}, acc, _defineProperty({}, key, difference)); // return updated key\n    }, deletedValues);\n  };\n\n  exports.default = diff;\n  module.exports = exports['default'];\n});\n\n//# sourceURL=webpack://examin/./node_modules/deep-object-diff/dist/diff/index.js?");

/***/ }),

/***/ "./node_modules/deep-object-diff/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/deep-object-diff/dist/index.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./diff */ \"./node_modules/deep-object-diff/dist/diff/index.js\"), __webpack_require__(/*! ./added */ \"./node_modules/deep-object-diff/dist/added/index.js\"), __webpack_require__(/*! ./deleted */ \"./node_modules/deep-object-diff/dist/deleted/index.js\"), __webpack_require__(/*! ./updated */ \"./node_modules/deep-object-diff/dist/updated/index.js\"), __webpack_require__(/*! ./detailed */ \"./node_modules/deep-object-diff/dist/detailed/index.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports, _diff, _added, _deleted, _updated, _detailed) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n  exports.detailedDiff = exports.updatedDiff = exports.deletedDiff = exports.diff = exports.addedDiff = undefined;\n\n  var _diff2 = _interopRequireDefault(_diff);\n\n  var _added2 = _interopRequireDefault(_added);\n\n  var _deleted2 = _interopRequireDefault(_deleted);\n\n  var _updated2 = _interopRequireDefault(_updated);\n\n  var _detailed2 = _interopRequireDefault(_detailed);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  exports.addedDiff = _added2.default;\n  exports.diff = _diff2.default;\n  exports.deletedDiff = _deleted2.default;\n  exports.updatedDiff = _updated2.default;\n  exports.detailedDiff = _detailed2.default;\n});\n\n//# sourceURL=webpack://examin/./node_modules/deep-object-diff/dist/index.js?");

/***/ }),

/***/ "./node_modules/deep-object-diff/dist/updated/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/deep-object-diff/dist/updated/index.js ***!
  \*************************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! ../utils */ \"./node_modules/deep-object-diff/dist/utils/index.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (module, exports, _utils) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  function _defineProperty(obj, key, value) {\n    if (key in obj) {\n      Object.defineProperty(obj, key, {\n        value: value,\n        enumerable: true,\n        configurable: true,\n        writable: true\n      });\n    } else {\n      obj[key] = value;\n    }\n\n    return obj;\n  }\n\n  var _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  var updatedDiff = function updatedDiff(lhs, rhs) {\n\n    if (lhs === rhs) return {};\n\n    if (!(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return rhs;\n\n    var l = (0, _utils.properObject)(lhs);\n    var r = (0, _utils.properObject)(rhs);\n\n    if ((0, _utils.isDate)(l) || (0, _utils.isDate)(r)) {\n      if (l.valueOf() == r.valueOf()) return {};\n      return r;\n    }\n\n    return Object.keys(r).reduce(function (acc, key) {\n\n      if (l.hasOwnProperty(key)) {\n        var difference = updatedDiff(l[key], r[key]);\n\n        if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference) && !(0, _utils.isDate)(difference)) return acc;\n\n        return _extends({}, acc, _defineProperty({}, key, difference));\n      }\n\n      return acc;\n    }, {});\n  };\n\n  exports.default = updatedDiff;\n  module.exports = exports['default'];\n});\n\n//# sourceURL=webpack://examin/./node_modules/deep-object-diff/dist/updated/index.js?");

/***/ }),

/***/ "./node_modules/deep-object-diff/dist/utils/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/deep-object-diff/dist/utils/index.js ***!
  \***********************************************************/
/***/ (function(module, exports) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  var _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) {\n    return typeof obj;\n  } : function (obj) {\n    return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n  };\n\n  var isDate = exports.isDate = function isDate(d) {\n    return d instanceof Date;\n  };\n  var isEmpty = exports.isEmpty = function isEmpty(o) {\n    return Object.keys(o).length === 0;\n  };\n  var isObject = exports.isObject = function isObject(o) {\n    return o != null && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';\n  };\n  var properObject = exports.properObject = function properObject(o) {\n    return isObject(o) && !o.hasOwnProperty ? _extends({}, o) : o;\n  };\n});\n\n//# sourceURL=webpack://examin/./node_modules/deep-object-diff/dist/utils/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/backend/injected.js");
/******/ 	
/******/ })()
;