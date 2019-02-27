import ERModelController from './Controllers/ERModelController'
import Router from './Utils/Router'
import PackController from './Controllers/PackController'
import {ipcMain} from 'electron'
import { dialog } from 'electron'
import FsWrapper from './FsWrapper/FsWrapper'

const fsWrapper = new FsWrapper()
const router = new Router(ipcMain)

/**
 * Controllers
 */

const eRModelController = new ERModelController(fsWrapper, dialog)
const packController = new PackController()

/**
 * Routes
 */

router.method('export', eRModelController, 'export')
router.method('importStart', eRModelController, 'import')
router.method('generateStart', packController, 'listPackages')
router.method('generateSelected', packController, 'generateSelectedPackages')
