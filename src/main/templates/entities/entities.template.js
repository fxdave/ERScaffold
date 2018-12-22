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
            
            this.addFile(new TemplateFile( __dirname + '/entity.base.ejs', {
                entity : entity
            }, 'App/'+ entity.name + '.php'))
            
            this.addFile(new TemplateFile( __dirname + '/connections.ejs', {
                entity : entity
            }, 'App/'+ entity.name + '.php', "members"))
        })
    }

    
}

export default EntityTemplate