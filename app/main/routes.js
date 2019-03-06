import ERModelController from './Controllers/ERModelController'
import Router from './Utils/Router'
import PackController from './Controllers/PackController'
import { ipcMain } from 'electron'
import { dialog } from 'electron'
import FsWrapper from './FsWrapper/FsWrapper'
import PackCollectionReader from './PackUtils/PackCollectionReader/PackCollectionReader'
import PackReader from './PackUtils/PackReader/PackReader'
import TemplateRenderer from './PackUtils/TemplateRenderer/TemplateRenderer'
import Generator from './PackUtils/Generator/Generator'
import GitWrapper from './GitWrapper/GitWrapper'
import RequirementReader from './PackUtils/RequirementReader/RequirementReader';

/**
 * Controller dependencies
 */

const gitWrapper = new GitWrapper()
const fsWrapper = new FsWrapper()
const router = new Router(ipcMain)
const requirementReader = new RequirementReader(fsWrapper)
const packReader = new PackReader(fsWrapper,requirementReader)
const templateRenderer = new TemplateRenderer(fsWrapper)
const generator = new Generator(fsWrapper, gitWrapper)
const packCollectionReader = new PackCollectionReader(fsWrapper, packReader)
/**
 * Controllers
 */

const eRModelController = new ERModelController(fsWrapper, dialog)
const packController = new PackController(
    packCollectionReader,
    templateRenderer,
    generator,
    requirementReader
)

/**
 * Routes
 */

router.method('export', eRModelController, 'export')
router.method('import', eRModelController, 'import')

router.method('generateSelect', packController, 'listPackages')
router.method('generateSelected', packController, 'generateSelectedPackages')
