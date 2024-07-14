const { app, BrowserWindow } = require("electron");
const RPC = require("discord-rpc");
const config = require("./configs/config.json");
const rpc = new RPC.Client({
    transport: "ipc"
});

function createWindow() {
  const win = new BrowserWindow({
    title: "YouTube Browser",
    autoHideMenuBar: true,
    width: 1280,
    height: 720,
  });

  win.loadURL("https://youtube.com/");
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});