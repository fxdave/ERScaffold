import Element from '../../Utils/Element'
import Konva from '../../Vendor/Konva'
class EditableText extends Element {
    constructor() {
        super()
        this.shape = new Konva.Text
    }

    edit() {
        let val = prompt("Type the name")
        if (val != "")
            this.shape.text(val)
        else
            this.shape.text("empty")

        this.shape.dispatchEvent(new Event('updated:width'));
        this.shape.dispatchEvent(new Event('updated:text'));
        this.redraw()
    }
}
export default EditableText