console.log('Logging from preload!');
console.log('🦄🦄🦄');

// // console.log(window);
// // setTimeout(console.log(window), 5000);

// console.log(window.__REACT_DEVTOOLS_GLOBAL_HOOK__);


// console.log('Logging the window object: ', window);

// window.onload = function injectJs() {
//   const htmlBody = document.getElementsByTagName('body')[0];
//   const script = document.createElement('script');
//   script.setAttribute('type', 'text/javascript');
//   script.setAttribute('src', 'backend/injected.js');
//   htmlBody.appendChild(script);
// }

const { ipcRenderer } = require('electron');

// We need to wait until the main world is ready to receive the message before
// sending the port. We create this promise in the preload so it's guaranteed
// to register the onload listener before the load event is fired.
const windowLoaded = new Promise(resolve => {
  window.onload = resolve
})

ipcRenderer.on('main-world-port', async (event) => {
  await windowLoaded
  // We use regular window.postMessage to transfer the port from the isolated
  // world to the main world.
  window.postMessage('main-world-port', '*', event.ports)
})