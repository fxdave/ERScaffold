
import Element from '../../Utils/Element'
import RelationShape from './RelationShape'
import RelationStyle from './RelationStyle'
class Relation extends Element {
    constructor() {
        super()
        this.style = RelationStyle
        this.shape = RelationShape()
    }

    onEditText(e) {
        e.cancelBubble = true
        this.getShape('text').edit()
        this.redraw()
    }

    onDelete() {
        this.shape.dispatchEvent(new Event('remove'))
    }
}

export default Relation