import Konva from '../Vendor/Konva'
import ElementRenderer from './ElementRenderer'
class Shape extends Konva.Group {
    constructor(props) {
        super({
            draggable: props ? props.draggable : false
        })

        if(!props){
            props = {}
        }

        this.props = props
        

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