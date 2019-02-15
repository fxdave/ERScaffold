import Konva from '../Vendor/Konva'
import ElementRenderer from './ElementRenderer'
class Shape extends Konva.Group {
    constructor(props = {}) {
        super({
            draggable: props.draggable,
            dragBoundFunc: props.dragBoundFunc
        })

        this.props = props
        if(props._arranger_enabled)
            this._arranger_enabled = props._arranger_enabled
        if(props._arrangerBoundingType)
            this._arrangerBoundingType = props._arrangerBoundingType
        if(props._arrangerMinimalSpace)
            this._arrangerMinimalSpace = props._arrangerMinimalSpace

        if(props.preCentered) {
            this.preCentered = this.preCentered
        }

        if(props.children) {
            for(let i in props.children) {
                if(props.children[i].shape) {
                    props.children[i].container = this
                    ElementRenderer.render(props.children[i], true)
                }
            }
        }

        //events are handled by the ElementRenderer

        
    }
}
export default Shape