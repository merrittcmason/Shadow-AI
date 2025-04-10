import require$$0, { ipcMain, app, BrowserWindow } from "electron";
import path from "path";
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
const electron = require$$0;
if (typeof electron === "string") {
  throw new TypeError("Not running in an Electron environment!");
}
const isEnvSet = "ELECTRON_IS_DEV" in process.env;
const getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
var electronIsDev = isEnvSet ? getFromEnv : !electron.app.isPackaged;
const isDev = /* @__PURE__ */ getDefaultExportFromCjs(electronIsDev);
let streamWindow = null;
function createMainWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}
function createStreamWindow() {
  streamWindow = new BrowserWindow({
    width: 400,
    height: 600,
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (isDev) {
    streamWindow.loadURL("http://localhost:5173/stream");
  } else {
    streamWindow.loadFile(path.join(__dirname, "../dist/index.html"), {
      hash: "stream"
    });
  }
}
ipcMain.handle("get-sources", async () => {
  return [];
});
ipcMain.handle("start-stream", async (event, sourceId) => {
  createStreamWindow();
  return { success: true };
});
ipcMain.handle("start-audio-capture", async () => {
  return { success: true };
});
ipcMain.handle("capture-screenshot", async () => {
  return { success: true };
});
app.whenReady().then(createMainWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
