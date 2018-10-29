import Element from '../../Utils/Element'
import MathHelper from '../../../oldsrc/Utils/Math/MathHelper'
import HasManyConnectorHandleShape from './HasManyConnectorHandleShape'
import HasManyConnectorHandleStyle from './HasManyConnectorHandleStyle'

class HasManyConnectorHandle extends Element {
    constructor() {
        super()
        this.style = HasManyConnectorHandleStyle
        this.shape = HasManyConnectorHandleShape()
    }

    mounted() {
        this.direct({ x: 0, y: 0 }, { x: 20, y: 0 })
    }

    onDrag() {
        //waitForDrop (moving to temp layer)
    }

    onMove() {
        //direct to the mouse position
        this.redraw()
    }

    onDrop() {
        //close waiting for drop (moving back to the original layer)
        this.redraw()
    }

    direct(from, to) {
        let proj = MathHelper.triangularProjection(from, to, 3)
        this.getShape('triangle').shape.points([from.x, from.y, proj[0], proj[1], proj[4], proj[5]])
        
        
        this.redraw()
    }
}
export default HasManyConnectorHandle