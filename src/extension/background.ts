console.log('logging in background.js');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const { action, message } = request;
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
            htmlBody.appendChild(script);
          };
          injectScript(chrome.runtime.getURL('bundles/backend.bundle.js'), 'body');
        `,
			});
			break;
		}
		case 'addTest': {
			console.log('received addTest');
      console.log('The request message is: ', message);
			break;
			// chrome.runtime.sendMessage({ action: 'receivedAddTest' });
		}
		default:
			break;
	}
});
