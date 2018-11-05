
import Element from '../../Utils/Element'
import PropertyShape from './PropertyShape'
import PropertyStyle from './PropertyStyle'
import PropertyModel from './PropertyModel'

class Property extends Element {
    constructor() {
        super()

        this.style = PropertyStyle
        this.shape = PropertyShape()
        this.model = new PropertyModel(this.shape)
    }

    changeText() {
        this.getShape('text').edit()
        this.model.name = this.getShape('text').shape.text()
    }

    onChangeText(e) {
        e.cancelBubble = true
        this.changeText()
    }

    onDelete() {
        this.shape.dispatchEvent(new Event('delete'))
    }
}

export default Property