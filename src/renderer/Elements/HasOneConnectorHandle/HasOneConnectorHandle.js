import Element from '../../Utils/Element'
import HasOneConnectorHandleShape from './HasOneConnectorHandleShape'
import HasOneConnectorHandleStyle from './HasOneConnectorHandleStyle'
import EntityLayer from '../../Layers/EntityLayer'
import Entity from '../Entity/Entity'
import MathHelper from '../../Utils/Math/MathHelper'
class HasOneConnectorHandle extends Element {
    constructor() {
        super()
        this.style = HasOneConnectorHandleStyle
        this.shape = HasOneConnectorHandleShape()
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
        
        this.getShape('line').shape.points([from.x, from.y, to.x, to.y])
        
        
        this.redraw()
    }
}
export default HasOneConnectorHandle