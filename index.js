const { app, BrowserWindow } = require('electron/main');
const path = require('node:path');
const RPC = require("discord-rpc");
const config = require("./configs/config.json");
const rpc = new RPC.Client({
    transport: "ipc"
});

function createWindow () {
  const win = new BrowserWindow({
    title: "YouTube",
    autoHideMenuBar: true,
    width: 1000,
    height: 1000,
  });

  win.loadURL('https://youtube.com/');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    rpc.on("ready", () => {
        // We set button.
        rpc.setActivity({
            buttons: [
                { label : `Rejoignez le support`, url: `${config.discord}`}
            ],
    
            // We set all details for your rpc.
            details: `Regarde des vidéos`,
            startTimestamp: new Date(),
            largeImageKey: "youtube",
            largeImageText: "Le divertissement est un bien essentiel."
                
                
        });
    });
    // Connect to Discord with discord-rpc module
    rpc.login({ 
        clientId: config.clientId,
    });
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    };
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});