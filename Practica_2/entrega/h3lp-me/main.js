const { app, BrowserWindow, getCurrentWindow, globalShortcut, screen } = require('electron')


let win;

function createWindow () {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    icon: `file://${__dirname}/dist/h3lp-me/assets/logos/logo2.png`
  })


  win.loadURL(`file://${__dirname}/dist/h3lp-me/index.html`)



  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})

// var reload = ()=>{
//   getCurrentWindow().reload()
// }
// //
// globalShortcut.register('F5', reload);
// globalShortcut.register('CommandOrControl+R', reload);
// // here is the fix bug #3778, if you know alternative ways, please write them
// window.addEventListener('beforeunload', ()=>{
//   globalShortcut.unregister('F5', reload);
//   globalShortcut.unregister('CommandOrControl+R', reload);
// })
