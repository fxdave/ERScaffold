
import Element from '../../Utils/Element'
import ManyShape from './ManyShape'
import ManyStyle from './ManyStyle'
import MathHelper from '../../Utils/Math/MathHelper'

class Many extends Element {
    constructor() {
        super()
        this.style = ManyStyle
        this.shape = ManyShape()
    }

    /**
     * 
     * @param {Object} from
     * @param {number} from.x
     * @param {number} from.y 
     * @param {Object} to 
     * @param {number} to.x
     * @param {number} to.y
      */
    change(from,to) {
        let coords = MathHelper.triangularProjection(from,to,7)
        this.getShape('line1').shape.points([
            from.x,
            from.y,
            coords[0],
            coords[1]
        ])
        this.getShape('line2').shape.points([
            from.x,
            from.y,
            coords[2],
            coords[3]
        ])
        this.getShape('line3').shape.points([
            from.x,
            from.y,
            coords[4],
            coords[5]
        ])
        this.redraw()
    }
}

export default Many