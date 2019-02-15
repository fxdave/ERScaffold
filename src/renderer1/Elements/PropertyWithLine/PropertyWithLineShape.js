
import Shape from '../../Utils/Shape'
import Property from '../Property/Property'
import LineShape from '../LineShape/LineShape'
import EventRegister from '../../Utils/EventRegister'
import LineAnchor from '../../Utils/Anchors/LineAnchor'
export default function() {
    let props = {}


    props.children = {
        line: new LineShape,
        property: new Property,
    }

    props.events = {
        onDelete: new EventRegister(props.children.property,'delete')
    }

    props.anchors = {
        lineAnchor: new LineAnchor(props.children.line, {
            watch: {
                from: props.children.property
            },
            update(from) {
                props.children.line.shape.points([from.shape.x(),from.shape.y(), 0,0])
            }
        })
    }

    return new Shape(props)
}