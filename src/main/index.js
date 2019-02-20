import fs from 'fs'
import { app, BrowserWindow, /*Menu,*/ ipcMain, dialog } from 'electron'
import Model from './model/Model'
import PackUtil from './PackUtil'
import TemplateUtil from './TemplateUtil'
import path from 'path'
import Generator from './Generator'

let mainWindow
app.commandLine.appendSwitch('remote-debugging-port', '9223')
app.on('ready', function () {
    //create new window

    mainWindow = new BrowserWindow({})
    if (process.env.MODE && process.env.MODE == "development")
        mainWindow.loadURL('http://localhost:3000')
    else
        mainWindow.loadURL('file://' + path.join(__dirname, "..", "../public/index.html"))

    //const MainMenu = Menu.buildFromTemplate(MainMenuTemplate)
    //Menu.setApplicationMenu(MainMenu)


    /**
     * exporter
     */
    ipcMain.on('export', function (e, data) {

        let selectedFile = dialog.showSaveDialog({
            title: '',
            defaultPath: '~/.erscaffold'
        })

        fs.writeFile(selectedFile, JSON.stringify(data), function (err) {
            if (err) {
                return console.log(err)
            }

            console.log('The file was saved!')
        })
    })

    /**
     * importer
     */
    ipcMain.on('importStart', function (e) {

        let selectedFiles = dialog.showOpenDialog()
        fs.readFile(selectedFiles[0], function (err, data) {
            console.log(data)

            e.sender.send('import', data.toString('utf8'))
        })


    })

    /**
     * Gets the available packs and the 
     */
    ipcMain.on('generateStart', function (e, data) {
        let model = new Model(data)
        app.generateModel = model

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

    /**
     * 
     */
    ipcMain.on('generateSelected', function (e, data) {
        app.generateModel.getEntities().forEach(entity => {
            Promise.all(data.map(template => {
                return TemplateUtil.getTemplate(template.pack, template.template, { entity }, data.appName)
            })).then(res => {
                console.log(res)
                Generator.generate(res).then(() => {
                    e.sender.send('generateSelectFinished', {
                        success: true
                    })
                }).catch((err) => {
                    e.sender.send('generateSelectFinished', {
                        success: false,
                        error: err
                    })
                })
            }).catch(err => {
                console.error(err);
                e.sender.send('generateSelectFinished', {
                    success: false,
                    error: err
                })
            })
        })
    })
})
/*
const MainMenuTemplate = [
]
*/