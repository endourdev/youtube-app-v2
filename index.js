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

rpc.on('ready', () => {
  console.log('Discord RPC connected');
  rpc.setActivity({
    details: 'Browsing YouTube',
    startTimestamp: new Date(),
    largeImageKey: 'youtube_icon',
    largeImageText: 'YouTube',
    smallImageKey: 'electron_icon',
    smallImageText: 'Electron App'
  });
});

rpc.on('error', (error) => {
  console.error('Discord RPC error:', error);
  console.log('Error details:', error.message);
  console.log('Stack trace:', error.stack);
});

console.log('Attempting to connect to Discord with client ID:', config.client);
rpc.login({ clientId: "1261476866586447922" })
  .then(() => {
    console.log('Successfully connected to Discord');
  })
  .catch((error) => {
    console.error('Failed to connect to Discord:', error);
    console.log('Error details:', error.message);
    console.log('Stack trace:', error.stack);
  });