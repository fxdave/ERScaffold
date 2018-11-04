
import Element from '../../Utils/Element'
import Konva from '../../Vendor/Konva'

class EllipseShape extends Element {

    constructor() {
        super()
        this.shape = new Konva.Ellipse
    }
}

export default EllipseShape