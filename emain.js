// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

const createWindow = () => {
  // Create the browser window.
  const size = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    // Get size of the screen

    width: size.width,
    height: size.height,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false, // false if you want to run e2e test with Spectron
      // allowRunningInsecureContent: serve ? true : false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "/dist/paems/index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// if (serve) {
//   win.webContents.openDevTools();
//   require("electron-reload")(__dirname, {
//     electron: require(path.join(__dirname, "/../node_modules/electron")),
//   });
//   win.loadURL("http://localhost:4200");
// } else {
//   // Path when running electron executable
//   let pathIndex = "./index.html";

//   if (fs.existsSync(path.join(__dirname, "../dist/index.html"))) {
//     // Path when running electron in local folder
//     pathIndex = "../dist/index.html";
//   }

//   win.loadURL(
//     url.format({
//       pathname: path.join(__dirname, pathIndex),
//       protocol: "file:",
//       slashes: true,
//     })
//   );
// }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

