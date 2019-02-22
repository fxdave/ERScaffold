import { app, BrowserWindow, /* Menu, */ ipcMain, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import fs from 'fs'
import Model from './model/Model'
import PackUtil from './PackUtil'
import TemplateUtil from './TemplateUtil'
import path from 'path'
import Generator from './Generator'
import process from 'process'
import url from 'url'
import ARGV from './meta/ARGV'

export default class AppUpdater {
  constructor () {
    log.transports.file.level = 'info'
    autoUpdater.logger = log
    autoUpdater.checkForUpdatesAndNotify()
  }
}

let mainWindow = null

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')()
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log)
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions()
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  })

  mainWindow.loadURL(`file://${path.join(__dirname, '../')}/app.html`)

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  /*
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
  */

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater()

  /*
        const MainMenu = Menu.buildFromTemplate(MainMenuTemplate)
        Menu.setApplicationMenu(MainMenu)
    */

  // select project dir
  
  if (ARGV[0]) {
    console.log(ARGV)
    process.chdir(ARGV[0])
  } else {
    let selectedDir = dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    })    
    process.chdir(selectedDir[0])
  }

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
      })
      .catch(error => {
        console.error(error)
      })
  })

  /**
   *
   */
  ipcMain.on('generateSelected', function (e, data) {
    app.generateModel.getEntities().forEach(entity => {
      Promise.all(
        data.map(template => {
          return TemplateUtil.getTemplate(
            template.pack,
            template.template,
            { entity },
            data.appName
          )
        })
      )
        .then(res => {
          console.log(res)
          Generator.generate(res)
            .then(() => {
              e.sender.send('generateSelectFinished', {
                success: true
              })
            })
            .catch(err => {
              e.sender.send('generateSelectFinished', {
                success: false,
                error: err
              })
            })
        })
        .catch(err => {
          console.error(err)
          e.sender.send('generateSelectFinished', {
            success: false,
            error: err
          })
        })
    })
  })
})
