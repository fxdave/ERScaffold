import Konva from '../../Vendor/Konva'
import Element from '../../Utils/Element'
class RectangleShape extends Element {
    constructor() {
        super()
        this.shape = new Konva.Rect
    }
}

export default RectangleShape