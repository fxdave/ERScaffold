
import EntityTemplate from './templates/entities/entities.template'
import fs from 'fs';

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
        template.save()
    }


}

export default Generator