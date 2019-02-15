import Element from '../../Utils/Element'
import HasManyConnectorHandleShape from './HasManyConnectorHandleShape'
import HasManyConnectorHandleStyle from './HasManyConnectorHandleStyle'
import EntityLayer from '../../Layers/EntityLayer'
import Entity from '../Entity/Entity'
import MathHelper from '../../Utils/Math/MathHelper'
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
        this.moveToTempLayer()
        this.setRotation(0)
    }

    onMove(e) {
        e.cancelBubble = true

        this.direct({
            x: 0, y: 0
        },{
            x: e.evt.clientX - this.shape.getAbsolutePosition().x, 
            y: e.evt.clientY - this.shape.getAbsolutePosition().y
        })

        this.redraw()
    }

    onDrop() {
        this.moveToPreviousLayer()
        this.direct({ x: 0, y: 0 }, { x: 20, y: 0 })
        this.setPreviousRotation()
        this.redraw()

        var pos = this.shape.getStage().getPointerPosition()
        var shape = EntityLayer.getIntersection(pos)

        if (shape) {
            let to = shape.parent
            while (!(to.element instanceof Entity))
                to = to.parent

            this.shape.dispatchEvent(new CustomEvent('connect',{
                detail: {
                    to : to.element
                }
            }))
        }
    }

    setRotation(r) {
        this.previousRotation = this.shape.rotation()
        this.shape.rotation(r)
    }

    setPreviousRotation() {
        this.shape.rotation(this.previousRotation)
    }

    direct(from, to) {
        let proj = MathHelper.triangularProjection(from, to, 5)
        let proj2 = MathHelper.triangularProjection(to, from, 1)
        this.getShape('triangle').shape.points([proj2[0], proj2[1], proj2[4], proj2[5], proj[0], proj[1], proj[4], proj[5]])

        this.redraw()
    }
}
export default HasManyConnectorHandle