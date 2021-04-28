// Runs when user navigates to localhost:3000

console.log('Chrome Extension READY!!');

let firstRun = true;

// Use chrome extension method chrome.runtime.sendMessage()
// to send message to chrome runtime (refer to background.js)

// chrome.runtime.sendMessage({ action: 'injectScript' })
// function handleMessage(request, sender, sendResponse) {
  //     return chrome.runtime.sendMessage(request)
  // }
function handleMessage(request, sender, sendResponse) {

  // the shape of request.data = { type: 'addTest', message: [(testArray)] }
  if (request.data.type === 'addTest'){ 
    console.log('in content.js, request.data: ', request.data)
    // Send a message to background.js with the shape { action: 'addTest', message: [(testArray)] }
    return chrome.runtime.sendMessage({ action: request.data.type, message: request.data.message });
  } 
  // if (request.data.type === 'initial panel load'){ 
  //   console.log('inside initial panel load in content.js')
  //   return chrome.runtime.sendMessage({ action: request.data.type});
  // }
}

// Window Listening for messeges in the window, if it recieves a 'message'
window.addEventListener('message', handleMessage);

// Chrome Listening for messeges in the browser, if it recieves a 'message'
chrome.runtime.onMessage.addListener((request) => {
  // Send a postMessage to window to forward request to injected.js
  window.postMessage(request, '*');
})

// Send a message to background.js with the shape { action: 'injectScript' } to injectScript
chrome.runtime.sendMessage({ action: 'injectScript' })
