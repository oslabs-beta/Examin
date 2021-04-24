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

/***/ "./src/extension/background.ts":
/*!*************************************!*\
  !*** ./src/extension/background.ts ***!
  \*************************************/
/***/ (() => {

eval("console.log('logging in background.js');\r\nchrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {\r\n    var action = request.action;\r\n    var tabId = sender.tab.id;\r\n    switch (action) {\r\n        case 'injectScript': {\r\n            console.log('injecting script to the current tab');\r\n            chrome.tabs.executeScript(tabId, {\r\n                code: \"\\n          console.log('injecting javascript----');\\n\\n          const injectScript = (file, tag) => {\\n            const htmlBody = document.getElementsByTagName(tag)[0];\\n            const script = document.createElement('script');\\n            script.setAttribute('type', 'text/javascript');\\n            script.setAttribute('src', file);\\n            htmlBody.appendChild(script);\\n          };\\n          injectScript(chrome.runtime.getURL('bundles/backend.bundle.js'), 'body');\\n        \",\r\n            });\r\n            break;\r\n        }\r\n        default:\r\n            break;\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://examin/./src/extension/background.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/extension/background.ts"]();
/******/ 	
/******/ })()
;