
import Element from '../../Utils/Element'
import PropertyShape from './PropertyShape'
import PropertyStyle from './PropertyStyle'

class Property extends Element {
    constructor() {
        super()

        this.style = PropertyStyle
        this.shape = PropertyShape()
    }

    changeText() {
        this.getShape('text').edit()
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