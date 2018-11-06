class Importer {

    static import(callback){
        let importerInput = document.getElementById('importerInput')
        importerInput.click()

        importerInput.addEventListener('input', e => {
            Importer.openFile(e,callback)
        })
    }


    static openFile(event, callback) {
        var input = event.target
    
        var reader = new FileReader()
        reader.onload = function(){
            callback(reader.result)
        }
        reader.readAsDataURL(input.files[0])
    }
}

export default Importer