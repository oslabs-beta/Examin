// Runs when user navigates to localhost:3000

console.log('Chrome Extension READY!!');

// Use chrome extension method chrome.runtime.sendMessage()
// to send message to chrome runtime (refer to background.js)
chrome.runtime.sendMessage({ action: 'injectScript' });
