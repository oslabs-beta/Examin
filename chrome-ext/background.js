// console.log(window);
console.log('logging in background.js')
// Loads when chrome extension is loaded

// console.log(window);

// Injecting a script
// chrome.tabs.executeScript(null, {code: injectedCode, runAt: 'document_end',})
// request = { action: 'injectScript' }

// const injectedCode = `

// `

// Injecting a script
// chrome.tabs.executeScript(null, {code: injectedCode, runAt: 'document_end',})


// Establishing incoming connection with devtools.
// chrome.runtime.onConnect.addListener((port) => {
//   port.onMessage.addListener((msg) => {
//     const { tabId } = msg;
//   })
// })

// background.js listening for a message from contentScript.js
// request = { action: 'injectScript' } (refer to content.js)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const { action } = request;
  const tabId = sender.tab.id;
  
	switch (action) {
		case 'injectScript': {
			console.log('injecting script to the current tab');

			chrome.tabs.executeScript(tabId, {
				code: `
          console.log('injecting javascript----');

          const injectScript = (file, tag) => {
            const htmlBody = document.getElementsByTagName(tag)[0];
            const script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', file);
            document.title=${tabId} + '-' + document.title
            htmlBody.appendChild(script);
          };
          injectScript(chrome.runtime.getURL('backend/injected.js'), 'body');
        `,
			});
			break;
		}
		default:
			break;
	}
});
