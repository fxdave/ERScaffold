
import Element from '../../Utils/Element'
import ManyShape from './ManyShape'
import MathHelper from '../../Utils/Math/MathHelper'

class Many extends Element {
    constructor() {
        super()
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
    change(from,trough,to,normalID = 1) {
        let coords = MathHelper.triangularProjection(trough,from,7)
        this.getShape('line1').change({x: coords[0], y: coords[1]},trough,to ,normalID)
        this.getShape('line2').change({x: coords[2], y: coords[3]},trough,to ,normalID)
        this.getShape('line3').change({x: coords[4], y: coords[5]},trough,to ,normalID)
        this.redraw()
    }
}

export default Many