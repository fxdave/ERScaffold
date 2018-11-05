
import Model from '../../../Utils/Model'
class ConnectionModel extends Model {
    constructor(from,to) {
        super()
        this.relation = null
        this.from = from
        this.to = to
    }

    toArray() {
        return {
            name: this.relation.getName(),
            id: this.getID(),
            from: this.from.getID(),
            to: this.to.getID()
        }
    }
}

export default ConnectionModel