import ejs from 'ejs'
import fs from 'fs'
class TemplateFile {
    
    /**
     * 
     * @param {string} url 
     * @param {Object} data 
     */
    constructor(url, data, destination) {
        this.url = url
        this.data = data
        this.destination = destination
    }

    render() {
        let template = fs.readFileSync(this.url, 'utf-8')
        return ejs.render(template, this.data)
    }

    getDestination() {
        return this.destination
    }
}

export default TemplateFile