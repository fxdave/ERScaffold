
import Element from '../../Utils/Element'
import PropertyWithLineShape from './PropertyWithLineShape'
import PropertyWithLineStyle from './PropertyWithLineStyle'

class PropertyWithLine extends Element {
    constructor() {
        super()

        this.shape = PropertyWithLineShape()
        this.style = PropertyWithLineStyle
    }

    changeText() {
        this.getShape('property').changeText()
    }

    onDelete() {
        this.remove()
    }
}

export default PropertyWithLine