import saveAs from 'file-saver';
import * as Elements from '../Elements/Elements'
import ViewportStorage from '../Models/ViewportStorage';
class Exporter {
    /**
     * 
     * @param {ViewportStorage} viewportStorage 
     */
    constructor(viewportStorage) {
        this.FORMAT = 'er.json'
        this.viewportStorage = viewportStorage
    }

    /**
     * makes file and starts the download
     */
    export() {
        // makeFile
        let file = this._makeFile()
        // download file
        this._download(file)
    }

    /**
     * makes the file
     */
    _makeFile() {
        let content = JSON.stringify(this.viewportStorage.toObject())
        var blob = new Blob([content], {type: "application/json;charset=utf-8"});
        return blob;
    }
    /**
     * downloads the file
     * @param {Blob} file 
     */
    _download(file) {
        saveAs(file, "schema." + this.FORMAT);
    }
}

export default Exporter;