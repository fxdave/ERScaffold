import ejs from 'ejs'
import fs from 'fs'
class TemplateFile {
    
    /**
     * 
     * @param {string} url 
     * @param {Object} data 
     */
    constructor(url, data, destination, section = undefined) {
        this.url = url
        this.data = data
        this.destination = destination
        this.section = section
    }

    render(base = undefined) {
        let template = fs.readFileSync(this.url, 'utf-8')
        let render = ejs.render(template, this.data)
        if(base) {
            let pattern = `(^.*?section:${this.section}.*?$)`
            let re = new RegExp(pattern, "gm");
            return base.rendered.replace(re, "$1"+render)
        }
        return render
    }

    getDestination() {
        return this.destination
    }

    isBase(){
        return this.section == undefined
    }
}

export default TemplateFile