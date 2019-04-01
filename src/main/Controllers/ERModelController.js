import Controller from './Controller'
import FsWrapper from '../FsWrapper/FsWrapper'
import Exporter from '../Utils/Exporter'
import Config from '../Config/Config';
class ERModelController extends Controller {
    /**
     *
     * @param {FsWrapper} fsWrapper
     * @param {Dialog} electronDialog
     * @param {Exporter} exporter
     */
    constructor(fsWrapper, electronDialog, exporter) {
        super()
        this.fsWrapper = fsWrapper
        this.electronDialog = electronDialog
        this.exporter = exporter
    }

    /**
     * opens a dialog to choose the desired path of the ERModel file
     * then saves the ER model
     * @async
     * @param {Object} e
     * @param {Object} data the ER model
     * @returns {...{success, msg}}
     */
    async export(e, data) {
        const selectedFile = this.electronDialog.showSaveDialog({
            title: '',
            defaultPath: '~/' + Config.defaultFileName
        })
        
        let err = this.exporter.export(data)

        if (err) return { success: false, msg: 'Sorry couldn\'t export the file.' }
        return { success: true, msg: 'Successfully exported!' }
    }

    /**
     * @async
     * opens a dialog to choose which ERModel file should be imported
     * @returns {string|Object}
     */
    async import() {
        try {
            const selectedFiles = this.electronDialog.showOpenDialog()
            let data = await this.fsWrapper.getFileContent(selectedFiles[0])
            return data
        } catch (e) {
            return { error: 'Sorry, couldn\'t import the file' }
        }
    }
}

export default ERModelController
