
import Model from '../../Utils/Model'
class RelationModel extends Model {
    constructor() {
        super()
        this.name = 'empty'
    }

    getName() {
        return this.name
    }
}

export default RelationModel