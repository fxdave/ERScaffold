import Konva from '../../Vendor/Konva'
import Element from '../../Utils/Element'
class CircleShape extends Element {
    constructor() {
        super()
        this.shape = new Konva.Circle
    }
}

export default CircleShape