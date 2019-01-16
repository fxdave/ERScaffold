class Template {
    constructor(name) {
        this.name = name
        this.files = []
    }

    /**
     * 
     * @param {TemplateFile} file 
     */
    addFile(file) {
        this.files.push(file)
    }   

    /**
     * @returns {Array<TemplateFile>}
     */
    getFiles(){
        return this.files
    }
}

export default Template