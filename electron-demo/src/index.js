const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const { app, BrowserWindow, BrowserView } = require('electron');
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
    webPreferences: {
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

  const childWindow = new BrowserWindow({
    width: 800,
    height: 400,
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })



  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  childWindow.loadURL('http://localhost:3000/')

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  childWindow.webContents.openDevTools();
  // console.log('hello world!');
  // mainWindow.webContents.executeJavaScript('window.__REACT_DEVTOOLS_GLOBAL_HOOK__')
  //   .then(result => console.log(result));
  // const contents = mainWindow.webContents
  // console.log(mainWindow.webContents)
  // console.log('hello')
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
