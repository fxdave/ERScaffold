import Element from '../../../Utils/Element'
import LineAnchor from '../../../Utils/Anchors/LineAnchor'

class Connection extends Element {
    constructor(from, to) {
        super()
        this.from = from
        this.to = to
    }

    onDelete() {
        this.remove()
    }

    hasFrom(entity) {
        return this.from == entity
    }

    hasTo(entity) {
        return this.to == entity
    }

    hasParticipant(entity) {
        if(this.from == entity || this.to == entity) 
            return true
        return false
    }
}

export default Connection