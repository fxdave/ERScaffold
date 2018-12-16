import LineShape from '../LineShape/LineShape'
import EventRegister from '../../Utils/EventRegister'
import Shape from '../../Utils/Shape'
export default function () {
    const props = {}

    props.children = {
        triangle: new LineShape
    }
    
    props.children.triangle.shape.dragBoundFunc (function() {
        return {
            x: props.children.triangle.shape.getAbsolutePosition().x,
            y: props.children.triangle.shape.getAbsolutePosition().y
        }
    })

    props.draggable = true

    props.events = {
        onDrag: new EventRegister(props.children.triangle, 'dragstart'),
        onMove: new EventRegister(props.children.triangle, 'dragmove'),
        onDrop: new EventRegister(props.children.triangle, 'dragend'),
    }

    let shape = new Shape(props)

    return shape
}