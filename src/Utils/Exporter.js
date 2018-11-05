import saveAs from 'file-saver'

class Exporter {

    /**
     * makes file and starts the download
     * 
     * @param {Model} model
     * @param {string} filename
     * @param {string} format
     */
    static export(model, filename, format) {
        // makeFile
        let file = Exporter._makeFile(model)
        // download file
        this._download(file, filename + '.' + format)
    }

    /**
     * makes the file
     */
    static _makeFile(model) {
        let content = JSON.stringify(model.toArray())
        var blob = new Blob([content], {type: 'application/json;charset=utf-8'})
        return blob
    }
    /**
     * downloads the file
     * @param {Blob} file 
     */
    static _download(file, filename) {
        saveAs(file, filename)
    }
}

export default Exporter