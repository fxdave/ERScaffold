const electron = require('electron')
const url = require('url')
const path = require('path')


const {app, BrowserWindow, Menu} = electron

let mainWindow

app.on('ready', function(){
    //create new window

    mainWindow = new BrowserWindow({})

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'build/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    const MainMenu = Menu.buildFromTemplate(MainMenuTemplate)
    Menu.setApplicationMenu(MainMenu)
})

const MainMenuTemplate = [
]