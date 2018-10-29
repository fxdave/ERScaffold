import LineShape from '../LineShape/LineShape'
import EventRegister from '../../Utils/EventRegister'
import Shape from '../../Utils/Shape'
export default function () {
    const props = {}

    props.children = {
        triangle: new LineShape
    }

    props.events = {
        onDrag: new EventRegister(props.children.triangle, 'dragstart'),
        onMove: new EventRegister(props.children.triangle, 'dragmove'),
        onDrop: new EventRegister(props.children.triangle, 'dragend'),
    }

    return new Shape(props)
}