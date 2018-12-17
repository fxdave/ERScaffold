
import EntityTemplate from './templates/entities/entities.template'

class Generator {

    /**
     * 
     * @param {Model} model 
     */
    constructor(model) {
        this.model = model
    }

    generate() {
        let template = new EntityTemplate(this.model)
        template.getFiles().map( file => {
            console.log(file.render())
        })
        
    }


}

export default Generator