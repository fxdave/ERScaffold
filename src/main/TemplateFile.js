import ejs from 'ejs'
import fs from 'fs'
class TemplateFile {
    
    /**
     * 
     * @param {string} url 
     * @param {Object} data 
     */
    constructor(url, data) {
        this.url = url
        this.data = data
    }

    render() {
        let template = fs.readFileSync(this.url, 'utf-8')
        return ejs.render(template, this.data)
    }
}

export default TemplateFile