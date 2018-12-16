import Model from '../../Utils/Model'

class Storage extends Model {
    constructor() {
        super()
        /** @var {EntityModel[]} */
        this.entities = []

        /** @var {ConnectionModel[]} */
        this.connections = []
    }

    toArray(){
        return {
            entities: this.entities.map(v => {
                return v.toArray()
            }),
            connections: this.connections.map(v => {
                return v.toArray()
            })
        }
    }
}

export default Storage