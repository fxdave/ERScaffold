
import Element from '../../Utils/Element'
import Konva from '../../Vendor/Konva'
class RhombusShape extends Element {
    constructor() {
        super()
        this.shape = new Konva.RegularPolygon({
            sides: 4
        })
    }
}

export default RhombusShape