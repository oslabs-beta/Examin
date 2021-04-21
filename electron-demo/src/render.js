// const { desktopCapturer, remote } = require('electron');

// const { writeFile } = require('fs');

// const { dialog, Menu } = remote;

// // Global state
// let mediaRecorder; // MediaRecorder instance to capture footage
// const recordedChunks = [];

// // Buttons
// const videoElement = document.querySelector('video');

// const startBtn = document.getElementById('startBtn');
// startBtn.onclick = e => {
//   mediaRecorder.start();
//   startBtn.classList.add('is-danger');
//   startBtn.innerText = 'Recording';
// };

// const stopBtn = document.getElementById('stopBtn');

// stopBtn.onclick = e => {
//   mediaRecorder.stop();
//   startBtn.classList.remove('is-danger');
//   startBtn.innerText = 'Start';
// };

// const videoSelectBtn = document.getElementById('videoSelectBtn');
// videoSelectBtn.onclick = getVideoSources;

// // Get the available video sources
// async function getVideoSources() {
//   const inputSources = await desktopCapturer.getSources({
//     types: ['window', 'screen']
//   });

//   const videoOptionsMenu = Menu.buildFromTemplate(
//     inputSources.map(source => {
//       return {
//         label: source.name,
//         click: () => selectSource(source)
//       };
//     })
//   );


//   videoOptionsMenu.popup();
// }

// // Change the videoSource window to record
// async function selectSource(source) {

//   videoSelectBtn.innerText = source.name;

//   const constraints = {
//     audio: false,
//     video: {
//       mandatory: {
//         chromeMediaSource: 'desktop',
//         chromeMediaSourceId: source.id
//       }
//     }
//   };

//   // Create a Stream
//   const stream = await navigator.mediaDevices
//     .getUserMedia(constraints);

//   // Preview the source in a video element
//   videoElement.srcObject = stream;
//   videoElement.play();

//   // Create the Media Recorder
//   const options = { mimeType: 'video/webm; codecs=vp9' };
//   mediaRecorder = new MediaRecorder(stream, options);

//   // Register Event Handlers
//   mediaRecorder.ondataavailable = handleDataAvailable;
//   mediaRecorder.onstop = handleStop;

//   // Updates the UI
// }

// // Captures all recorded chunks
// function handleDataAvailable(e) {
//   console.log('video data available');
//   recordedChunks.push(e.data);
// }

// // Saves the video file on stop
// async function handleStop(e) {
//   const blob = new Blob(recordedChunks, {
//     type: 'video/webm; codecs=vp9'
//   });

//   const buffer = Buffer.from(await blob.arrayBuffer());

//   const { filePath } = await dialog.showSaveDialog({
//     buttonLabel: 'Save video',
//     defaultPath: `vid-${Date.now()}.webm`
//   });

//   if (filePath) {
//     writeFile(filePath, buffer, () => console.log('video saved successfully!'));
//   }

// }

// console.log('hello world!')

// const webview = 

// const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

// document.getElementById('webviewWindow').innerHTML = `<webview 
//   id="foo" 
//   src="http://localhost:3000/" 
//   style="display:inline-flex; width:640px; height:280px; border: 1px solid"
//   nodeintegration
//   preload="file://${__dirname}/preload.js"
//   ></webview>`;
  


// const path = require('path');


const webview = document.querySelector("webview");
webview.addEventListener("dom-ready", () => {
  webview.openDevTools();

  // console.log('we are in the webview!');
  // console.log('🦄')

  // console.log(window);
  // alert(window)
  // console.log(webview.webC)
  // console.log(webview)
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


});

// const { ipcRenderer } = require('electron')

// ipcRenderer.on('ping', function(event, message){
//   console.log(message);
//   // console.log(window);
// });


