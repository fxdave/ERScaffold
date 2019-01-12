import fs from 'fs'
import {app, BrowserWindow, /*Menu,*/ ipcMain, dialog} from 'electron'
import Model from './model/Model'
import Generator from './Generator'
import PackUtil from './PackUtil'

let mainWindow
app.commandLine.appendSwitch('remote-debugging-port', '9223')
app.on('ready', function(){
    //create new window

    mainWindow = new BrowserWindow({})

    mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)

    //const MainMenu = Menu.buildFromTemplate(MainMenuTemplate)
    //Menu.setApplicationMenu(MainMenu)


    /**
     * exporter
     */
    ipcMain.on('export', function(e, data) {
        
        let selectedFile = dialog.showSaveDialog({
            title: '',
            defaultPath: '~/.erscaffold'
        })
        
        fs.writeFile(selectedFile, JSON.stringify(data), function(err) {
            if(err) {
                return console.log(err)
            }
        
            console.log('The file was saved!')
        }) 
    })

    /**
     * importer
     */
    ipcMain.on('importStart', function(e) {
        
        let selectedFiles = dialog.showOpenDialog()
        fs.readFile(selectedFiles[0], function(err, data) {
            console.log(data)
            
            e.sender.send('import', data.toString('utf8'))
        })
        
    })

    /**
     * generator
     */
    ipcMain.on('generateStart', function(e, data) {
        let model = new Model(data)
        PackUtil.getFilteredPacksForEntities(model.getEntities())
        .then(options => {
            let out = options.map(option => {
                return {
                    entity: {
                        id: option.entity.id,
                        name: option.entity.name
                    },
                    packs: option.packs
                }
            })
            e.sender.send('generateSelect', out)
        }).catch(error => {
            console.error(error);
            
        })
    })

    ipcMain.on('generateSelected', function(e, data) {
        console.log(data);
    })
})
/*
const MainMenuTemplate = [
]
*/