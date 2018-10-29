import Element from '../../Utils/Element'
import Konva from '../../Vendor/Konva'
class LineShape extends Element {

    constructor() {
        super()
        this.shape = new Konva.Line
    }
}
export default LineShape