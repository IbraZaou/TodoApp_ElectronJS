//app est la reference de la fenetre d'électron lorsqu'on créer la référence d'electron tout va être référencer dans app
//browser window plus besoin car on l'utilise directement dans WindowUtil
const { app, ipcMain, BrowserWindow } = require('electron');
//on recupère path de la partie node js pour gerer les chemins  
const path = require('path');

const WindowUtil = require('./app/class/WindowUtil');

const MenuUtil = require('./app/class/MenuUtil')

MenuUtil.initApplicationMenu()


app
    .whenReady()
    .then(() => {
        WindowUtil.createHomeView()
        ipcMain.on('open-context-menu', MenuUtil.createContextMenu)
    })

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        WindowUtil.createHomeView()
    }
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

