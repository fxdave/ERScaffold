import LineShape from '../LineShape/LineShape'
import EventRegister from '../../Utils/EventRegister'
import Shape from '../../Utils/Shape'
export default function () {
    const props = {}

    props.children = {
        line: new LineShape
    }
    
    props.children.line.shape.dragBoundFunc (function() {
        return {
            x: props.children.line.shape.getAbsolutePosition().x,
            y: props.children.line.shape.getAbsolutePosition().y
        }
    })

    props.draggable = true

    props.events = {
        onDrag: new EventRegister(props.children.line, 'dragstart'),
        onMove: new EventRegister(props.children.line, 'dragmove'),
        onDrop: new EventRegister(props.children.line, 'dragend'),
    }

    let shape = new Shape(props)

    return shape
}