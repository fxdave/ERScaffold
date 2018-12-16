import { ipcRenderer } from 'electron'

class Importer {

    static import(callback){
        ipcRenderer.send('importStart')

        ipcRenderer.on('import', (e,data) => {
            console.log(data)
            
            callback(data)
        })
    }
}

export default Importer