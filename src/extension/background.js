console.log('logging in background.js');

const connections = {};

let firstRun = true;


chrome.runtime.onConnect.addListener((port) => {
  console.log('in port connection: ', port)
  // create a new variable for a listener function
  const listenerForDevtool = (msg, sender, sendResponse) => {
    // creates a new key/value pair of current window & devtools tab
    if (msg.name === 'connect' && msg.tabId) {
      connections[msg.tabId] = port;
    }
  };
  // Listen from App.jsx
  // consistently listening on open port
  port.onMessage.addListener(listenerForDevtool);

  console.log("port.sender is: ",port.sender);
  console.log("Listing from devtool successfully made");
  chrome.runtime.sendMessage({ action: 'testMessage' });

  
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // IGNORE THE AUTOMATIC MESSAGE SENT BY CHROME WHEN CONTENT SCRIPT IS FIRST LOADED
  if (request.type === 'SIGN_CONNECT') {
    return true;
  }
  console.log(request.action)

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

      console.log('after injectScript ran, finished injecting')
			break;
		}
		case 'addTest': {
			console.log('received addTest');
      console.log('The request message is: ', message);
      // const tabId = sender.tab.id.toString();
      // if (firstRun) {
      //   chrome.runtime.onConnect.addListener((port) => {
      //     console.log('in addTest internal event listener')
      //     connections[tabId.toString()].postMessage('successful addTest')
      //     firstRun = false;
      //   })
      // } else {
      //   connections[tabId.toString()].postMessage('successful addTest')
      // }
      connections[tabId.toString()].postMessage('successful addTest')
      
			
			break;
			// chrome.runtime.sendMessage({ action: 'receivedAddTest' });
		}
    case 'initial panel load' :{
      console.log('received initial panel load');
    }
		default:
			break;
	}
});
