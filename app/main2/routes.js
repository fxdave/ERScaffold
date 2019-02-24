import ERModelController from './Controllers/ERModelController'
import Router from './Utils/Router'
import PackController from './Controllers/PackController'

const eRModelController = new ERModelController()
const packController = new PackController()

Router.method('export', eRModelController, 'export')
Router.method('importStart', eRModelController, 'import')
Router.method('generateStart', packController, 'listPackages')
Router.method('generateSelected', packController, 'generateSelectedPackages')
