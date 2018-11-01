
import Element from '../../Utils/Element'
import OneShape from './OneShape'
import OneStyle from './OneStyle'

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
    change(from,to) {
        this.getShape('one').shape.points([
            from.x,
            from.y,
            to.x,
            to.y
        ])
        this.redraw()
    }
}

export default One