import Element from '../../Utils/Element'
import Konva from '../../Vendor/Konva'
class EditableText extends Element {
    constructor() {
        super()
        this.shape = new Konva.Group
    }
}
export default EditableText