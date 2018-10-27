import Element from '../../Utils/Element'
import Konva from '../../Vendor/Konva'
class TextShape extends Element {
    constructor() {
        super()
        this.shape = new Konva.Text
    }
}
export default TextShape