import Controller from './Controller'
import FsWrapper from '../FsWrapper/FsWrapper'
class ERModelController extends Controller {
    /**
     *
     * @param {FsWrapper} fsWrapper
     * @param {Dialog} electronDialog
     */
    constructor(fsWrapper, electronDialog) {
        super()
        this.fsWrapper = fsWrapper
        this.electronDialog = electronDialog
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
            defaultPath: '~/.erscaffold'
        })

        let err = await this.fsWrapper.createFile(
            selectedFile,
            JSON.stringify(data)
        )

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
