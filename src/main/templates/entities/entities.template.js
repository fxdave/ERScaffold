import TemplateFile from '../../TemplateFile'
import Template from '../../Template'

class EntityTemplate extends Template {

    /**
     * 
     * @param {Object} model 
     * @param {Array<Object>} model.entities 
     * @param {string|undefined} model.entities[0].name
     * @param {string|undefined} model.entities[0].properties
     */
    constructor(model) {
        super('Entities Template')
        model.getEntities().forEach(entity => {
            console.log(entity)
            
            this.addFile(new TemplateFile( __dirname + '/entity.ejs',{
                entity : entity
            }))
        })
    }

    
}

export default EntityTemplate