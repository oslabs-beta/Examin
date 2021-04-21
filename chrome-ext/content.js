console.log("Chrome Extension READY!!");


chrome.runtime.sendMessage({ action: 'injectScript' });

