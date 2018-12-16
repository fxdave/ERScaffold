
import Element from '../../Utils/Element'
import OneShape from './OneShape'
import OneStyle from './OneStyle'
import MathHelper from '../../Utils/Math/MathHelper'
import Vector from '../../Utils/Math/Vector'

class One extends Element {
    constructor() {
        super()
        this.style = OneStyle
        this.shape = OneShape()
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
    change(from, trough, to, normalID = 1) {


        from = Vector.fromObject(from)
        to = Vector.fromObject(to)
        trough = Vector.fromObject(trough)

        this.getShape('one').shape.points([
            from.x,
            from.y,
            to.x,
            to.y,
            trough.x,
            trough.y,
        ])
        
        let C = MathHelper.getSmoothPoint(from,trough,to)
        if(Vector.getDistanceSquare(from,to) < 300) {
            let from_half_vector = Vector.sub(trough,from)
            let N = Vector.getNormal(from_half_vector, normalID)
            C = Vector.add(from,trough)
            C.divEachBy(2)

            try{
                N.normalize()
                N.mulEachBy(100)

                C.add(N)
            } catch(e) {
                // dont care
            }
        }

        this.getShape('one').shape.points([trough.x,trough.y,C.x,C.y,from.x,from.y])
        this.redraw()
    }
}

export default One