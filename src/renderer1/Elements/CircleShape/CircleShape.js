import Konva from '../../Vendor/Konva'
import Element from '../../Utils/Element'
class CircleShape extends Element {
    constructor() {
        super()
        this.shape = new Konva.Circle
        this.shape.preCentered = true
    }
}

export default CircleShape