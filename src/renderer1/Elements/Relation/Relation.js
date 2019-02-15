
import Element from '../../Utils/Element'
import RelationShape from './RelationShape'
import RelationStyle from './RelationStyle'
import RelationModel from './RelationModel'
class Relation extends Element {
    constructor() {
        super()
        this.style = RelationStyle
        this.shape = RelationShape()
        this.model = new RelationModel
    }

    onEditText(e) {
        e.cancelBubble = true
        this.getShape('text').edit()
        this.model.name = this.getShape('text').shape.text()
        this.redraw()
    }

    onDelete() {
        this.shape.dispatchEvent(new Event('remove'))
    }
}

export default Relation