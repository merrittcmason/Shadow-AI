import { app, BrowserWindow, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';

// Placeholder for stream handling
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
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
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
    streamWindow.loadURL('http://localhost:5173/stream');
  } else {
    streamWindow.loadFile(path.join(__dirname, '../dist/index.html'), {
      hash: 'stream'
    });
  }
}

// Placeholder for screen selection
ipcMain.handle('get-sources', async () => {
  // TODO: Implement screen source selection
  return [];
});

// Placeholder for starting stream
ipcMain.handle('start-stream', async (event, sourceId) => {
  // TODO: Implement stream start
  createStreamWindow();
  return { success: true };
});

// Placeholder for audio capture
ipcMain.handle('start-audio-capture', async () => {
  // TODO: Implement audio capture
  return { success: true };
});

// Placeholder for screenshot capture
ipcMain.handle('capture-screenshot', async () => {
  // TODO: Implement screenshot capture
  return { success: true };
});

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});