import { app, BrowserWindow, /* Menu, */ ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import fs from 'fs';
import path from 'path';
import process from 'process';
import url from 'url';
import Model from './model/Model';
import PackUtil from './PackUtil';
import TemplateUtil from './TemplateUtil';
import Generator from './Generator';
import ARGV from './meta/ARGV';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${path.join(__dirname, '../')}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  /*
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
  */

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();

  /*
        const MainMenu = Menu.buildFromTemplate(MainMenuTemplate)
        Menu.setApplicationMenu(MainMenu)
    */

  // select project dir

  if (ARGV[0]) {
    console.log(ARGV);
    process.chdir(ARGV[0]);
  } else {
    const selectedDir = dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    });
    process.chdir(selectedDir[0]);
  }
  console.log(process.cwd());

});