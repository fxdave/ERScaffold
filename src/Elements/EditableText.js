import Konva from '../Vendor/MyKonva'

class EditableText extends Konva.Text {
    constructor(props) {
        super(props)
        this.on("dblclick", e => {
            e.cancelBubble = true;
            this.editText()
        })
    }


    editText() {
        let val = prompt("Type the name")
        if (val != "")
            this.text(val)
        else
            this.text("empty")
        this.dispatchEvent(new Event('change'));
    }

}

export default EditableText