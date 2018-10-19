import Model from '../../Utils/Model'
class EntityModel extends Model {
    constructor() {
        
        /** @var PropertyModel */
        this.properties = []
    }

    toArray() {
        return this.properties.map(v => {
            return v.toArray()
        })
    }
}
export default EntityModel