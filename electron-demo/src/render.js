// document.getElementById('webviewWindow').innerHTML = `<webview 
//   id="foo" 
//   src="http://localhost:3000/" 
//   style="display:inline-flex; width:640px; height:280px; border: 1px solid"
//   nodeintegration
//   preload="file://${__dirname}/preload.js"
//   ></webview>`;
  
// const { ipcRenderer } = require('electron');

const webview = document.querySelector("webview");

webview.addEventListener("dom-ready", () => {
  webview.openDevTools();

  // console.log('we are in the webview!');
  // console.log(window);

});
// console.log(window);

webview.addEventListener("did-stop-loading", async ()=> {
  console.log('we are logging after webview content loads!');
  // console.log('🦄🦄');

  // console.log(`file://${__dirname}/backend/injected.js`)

  // console.log(window);
  
  // webview.executeJavaScript('console.log(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)')
  // .then(result => console.log(result))
  
  // const REACTDEVTOOLS = await webview.executeJavaScript('window.__REACT_DEVTOOLS_GLOBAL_HOOK__');
  // const injectJsFile = `file://${__dirname}/backend/injected.js`

  

  webview.executeJavascript(`
    window.onmessage = (event) => {
      // event.source === window means the message is coming from the preload
      // script, as opposed to from an <iframe> or other source.
      if (event.source === window && event.data === 'main-world-port') {
        const [ port ] = event.ports
        // Once we have the port, we can communicate directly with the main
        // process.
        port.onmessage = (event) => {
          console.log('from main process:', event.data)
          port.postMessage(event.data * 2)
        }
      }
    }
  `);


  // webview.executeJavaScript(`
  //   console.log('injecting javascript----');

  //   const injectScript = (file, tag) => {
  //     const htmlBody = document.getElementsByTagName(tag)[0];
  //     const script = document.createElement('script');
  //     script.setAttribute('type', 'text/javascript');
  //     script.setAttribute('src', file);
  //     htmlBody.appendChild(script);
  //   };
  //   injectScript(${injectJsFile}, 'body');
  // `);

  // ipcRenderer.on('ping', function(event, message){
  //   console.log(message);
  // });

});





