/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
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

eval("console.log('logging in background.js');\r\nchrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {\r\n    var action = request.action;\r\n    var tabId = sender.tab.id;\r\n    switch (action) {\r\n        case 'injectScript': {\r\n            console.log('injecting script to the current tab');\r\n            chrome.tabs.executeScript(tabId, {\r\n                code: \"\\n          console.log('injecting javascript----');\\n\\n          const injectScript = (file, tag) => {\\n            const htmlBody = document.getElementsByTagName(tag)[0];\\n            const script = document.createElement('script');\\n            script.setAttribute('type', 'text/javascript');\\n            script.setAttribute('src', file);\\n            htmlBody.appendChild(script);\\n          };\\n          injectScript(chrome.runtime.getURL('bundles/backend.bundle.js'), 'body');\\n        \",\r\n            });\r\n            break;\r\n        }\r\n        default:\r\n            break;\r\n    }\r\n});\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZXh0ZW5zaW9uL2JhY2tncm91bmQudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGFtaW4vLi9zcmMvZXh0ZW5zaW9uL2JhY2tncm91bmQudHM/Zjk3YSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zb2xlLmxvZygnbG9nZ2luZyBpbiBiYWNrZ3JvdW5kLmpzJyk7XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcclxuICAgIHZhciBhY3Rpb24gPSByZXF1ZXN0LmFjdGlvbjtcclxuICAgIHZhciB0YWJJZCA9IHNlbmRlci50YWIuaWQ7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICAgIGNhc2UgJ2luamVjdFNjcmlwdCc6IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luamVjdGluZyBzY3JpcHQgdG8gdGhlIGN1cnJlbnQgdGFiJyk7XHJcbiAgICAgICAgICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IFwiXFxuICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmplY3RpbmcgamF2YXNjcmlwdC0tLS0nKTtcXG5cXG4gICAgICAgICAgY29uc3QgaW5qZWN0U2NyaXB0ID0gKGZpbGUsIHRhZykgPT4ge1xcbiAgICAgICAgICAgIGNvbnN0IGh0bWxCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKVswXTtcXG4gICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcXG4gICAgICAgICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xcbiAgICAgICAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGZpbGUpO1xcbiAgICAgICAgICAgIGh0bWxCb2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XFxuICAgICAgICAgIH07XFxuICAgICAgICAgIGluamVjdFNjcmlwdChjaHJvbWUucnVudGltZS5nZXRVUkwoJ2J1bmRsZXMvYmFja2VuZC5idW5kbGUuanMnKSwgJ2JvZHknKTtcXG4gICAgICAgIFwiLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59KTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/extension/background.ts\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/extension/background.ts"]();
/******/ 	
/******/ })()
;