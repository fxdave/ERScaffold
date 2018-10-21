import Model from '../../Utils/Model'

class Storage extends Model {
    constructor() {
        super()
        /** @var {EntityModel} */
        this.entities = []

        /** @var {ConnectionModel} */
        this.connections = []
    }

    toArray(){
        return {
            entities: this.entities.toArray(),
            connections: this.connections.toArray()
        }
    }
}

export default Storage