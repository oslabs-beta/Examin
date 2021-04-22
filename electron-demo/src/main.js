const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const { app, BrowserWindow, BrowserView, ipcMain, MessageChannelMain } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 800,
    minHeight: 500,
    darkTheme: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webviewTag: true,
    },
  });
  // const view = new BrowserView();
  // mainWindow.setBrowserView(view);
  // view.setBounds({x: 0, y:0, width: 800, height: 400})
  // view.webContents.loadURL('http://localhost:3000/');
  // view.webContents.openDevTools();

  // const childWindow = new BrowserWindow({
  //   width: 800,
  //   height: 400,
  //   parent: mainWindow,
  //   webPreferences: {
  //     preload: path.join(__dirname, "preload.js"),
  //     nodeIntegration: true,
  //     contextIsolation: false,
  //     enableRemoteModule: true,
  //   },
  // })



  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // mainWindow.loadURL('http://localhost:3000/');
  // childWindow.loadURL('http://localhost:3000/');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  // childWindow.webContents.openDevTools();
  // console.log('hello world!');
  // mainWindow.webContents.executeJavaScript('window')
  //   .then(result => console.log(result));

  // childWindow.webContents.executeJavaScript('window')
  //   .then(result => console.log(result));
  // const contents = mainWindow.webContents
  // console.log(mainWindow.webContents)
  // console.log('hello')
  // console.log('🦄');


  const { port1, port2 } = new MessageChannelMain()

  // It's OK to send a message on the channel before the other end has
  // registered a listener. Messages will be queued until a listener is
  // registered.
  port2.postMessage({ test: 21 })

  // We can also receive messages from the main world of the renderer.
  port2.on('message', (event) => {
    console.log('from renderer main world:', event.data)
  })
  port2.start()

  mainWindow.webContents.on('did-finish-load', function() {

    // mainWindow.webContents.executeJavaScript('window.__REACT_DEVTOOLS_GLOBAL_HOOK__')
    //   .then(result => 
    //     mainWindow.webContents.send('ping', result)
    //   ).catch(err => console.log(err))

    // mainWindow.webContents.send('marco', 'Sending marco message from main.js: whooooooooahhhh!!');

    mainWindow.webContents.send('ping', 'Sending ping message from main.js: whooooooooahhhh!!');

    mainWindow.webContents.postMessage('main-world-port', null, [port1]);
    

  });





};

app.whenReady().then(() => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension: ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
