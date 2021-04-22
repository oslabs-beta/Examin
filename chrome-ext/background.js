// Loads when chrome extension is loaded

// console.log(window);

// const injectedCode = `

// `

// Injecting a script
// chrome.tabs.executeScript(null, {code: injectedCode, runAt: 'document_end',})

// Establishing incoming connection with devtools.
// request = { action: 'injectScript' } (refer to content.js)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const { action } = request;

	switch (action) {
		case 'injectScript': {
			console.log('injecting script to the current tab');

			chrome.tabs.executeScript(null, {
				code: `
          console.log('injecting javascript----');

          const injectScript = (file, tag) => {
            const htmlBody = document.getElementsByTagName(tag)[0];
            const script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', file);
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
