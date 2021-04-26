// Runs when user navigates to localhost:3000

console.log('Chrome Extension READY!!');

// Use chrome extension method chrome.runtime.sendMessage()
// to send message to chrome runtime (refer to background.js)
chrome.runtime.sendMessage({ action: 'injectScript' });

// function handleMessage(request, sender, sendResponse) {
//     return chrome.runtime.sendMessage(request)
// }
function handleMessage(request, sender, sendResponse) {
    // return chrome.runtime.sendMessage({ action: request.type, content: request.message })
    if (request.data.type === 'addTest'){ 
      console.log('in content.js, request.data: ', request.data)
      return chrome.runtime.sendMessage({ action: request.data.type, message: request.data.message })
    }
}

window.addEventListener('message', handleMessage);
// window.addEventListener('message', handleMessage);