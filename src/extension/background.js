// The background script (background.js) is running in the background of the Chrome browser
// this is analogous a server.js script where the server (or in this case a background.js) script
// runs continually to listen and route requests.

// In background.js, messages are analogous to requests

console.log('logging in background.js');

const connections = {};

let firstRun = true;

// Chrome on connecting to the Examin Panel, add an Listener
chrome.runtime.onConnect.addListener((port) => {
  console.log('in port connection: ', port)
  // create a new variable for a listener function
  const listenerForDevtool = (msg, sender, sendResponse) => { // msg = request
    // creates a new key/value pair of current window & devtools tab
    
    // Initial request shape = {
    //   name: 'connect',
    //   tabId: chrome.devtools.inspectedWindow.tabId,
    // }
    if (msg.name === 'connect' && msg.tabId) {
      // on 
      console.log('The tabId is: ', msg.tabId);
      connections[msg.tabId] = port;
    } else if (msg.name === 'pauseClicked' && msg.tabId) {
      console.log('background.js hears pauseClicked!');
      // Chrome sends a message to the tab at tabId to content.js with a shape of
      // request = { name: 'pauseClicked ' }
      chrome.tabs.sendMessage(msg.tabId, msg);
    } else if (msg.name === 'recordClicked' && msg.tabId) {
      console.log('background.js hears recordClicked!');
      // Chrome sends a message to the tab at tabId to content.js with a shape of
      // request = { name: 'recordClicked' }
      chrome.tabs.sendMessage(msg.tabId, msg);
    }
  };
  // Listen from App.jsx
  // consistently listening on open port
  port.onMessage.addListener(listenerForDevtool);

  // console.log("port.sender is: ", port.sender);
  console.log("Listing from devtool successfully made");
  // chrome.runtime.sendMessage({ action: 'testMessage' });
  
});


// Chrome listening for messages (from content.js?)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // IGNORE THE AUTOMATIC MESSAGE SENT BY CHROME WHEN CONTENT SCRIPT IS FIRST LOADED
  if (request.type === 'SIGN_CONNECT') {
    return true;
  }
  // console.log(request.action)

	const { action, message } = request;
  const tabId = sender.tab.id;
  
  // Check for action payload from request body
	switch (action) {
		case 'injectScript': {
      // Injects injected.js into the body element of the user's application
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
    // Where action = 'addTest', and message = testArray;
    // shape of message being recieve = { action: 'addTest', message: [(testArray)] }
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
      // Concatenate array of strings (message: [(testArray)])
      let joinedMsg = message.join('');

      // Sending another message to the front-end examin panel (at the current tab)
      // Access tabId property on connections object and posting a message to Examin frontend panel
      // connections[tabId] value is the id of user’s application’s tab
      connections[tabId.toString()].postMessage(joinedMsg)
      
			
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
