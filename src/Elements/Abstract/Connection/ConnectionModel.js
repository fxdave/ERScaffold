
import Model from '../../../Utils/Model'
class ConnectionModel extends Model {
    constructor(from,to) {
        super()
        this.relation = null
        this.relationShape = null
        this.from = from
        this.to = to
    }

    toArray() {
        return {
            x: this.relationShape.x(),
            y: this.relationShape.y(),
            name: this.relation.getName(),
            type: this.connectionType,
            id: this.getID(),
            from: this.from.getID(),
            to: this.to.getID()
        }
    }
}

export default ConnectionModel