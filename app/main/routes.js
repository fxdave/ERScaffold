import ERModelController from './Controllers/ERModelController'
import Router from './Utils/Router'
import PackController from './Controllers/PackController'
import {ipcMain} from 'electron'

const router = new Router(ipcMain)
const eRModelController = new ERModelController()
const packController = new PackController()

router.method('export', eRModelController, 'export')
router.method('importStart', eRModelController, 'import')
router.method('generateStart', packController, 'listPackages')
router.method('generateSelected', packController, 'generateSelectedPackages')
