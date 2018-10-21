import Shape from '../../Utils/Element'
import RectangleShape from '../RectangleShape/RectangleShape'
import EditableText from '../EditableText/EditableText';
import DeleteButton from '../DeleteButton/DeleteButton'
import AddButton from '../AddButton/AddButton'
import HasManyConnectorHandle from '../HasManyConnectorHandle/HasManyConnectorHandle'
import HasOneConnectorHandle from '../HasOneConnectorHandle/HasOneConnectorHandle'
import EventRegister from '../../Utils/EventRegister'
import WidthAnchor from '../../Utils/Anchors/WidthAnchor'
import PositionAnchor from '../../Utils/Anchors/PositionAnchor'
import LineAnchor from '../../Utils/Anchors/LineAnchor'
import LineShape from '../LineShape/LineShape'

const props = {}

props.children = {
    text: new EditableText,
    bg: new RectangleShape,
    deleteButton: new DeleteButton,
    propertyAddButton: new AddButton,
    propertyAddLine: new LineShape,
    hasManyConnectorHandle: new HasManyConnectorHandle,
    hasOneConnectorHandle: new HasOneConnectorHandle,
}

props.events = {
    onTextChange: new EventRegister({
        shape: props.children.text,
        eventName: "change"
    }),
    onHasManyConnect: new EventRegister({
        shape: props.children.hasManyConnectorHandle,
        eventName: "connect"
    }),
    onHasOneConnect: new EventRegister({
        shape: props.children.hasOneConnectorHandle,
        eventName: "connect"
    })
}

props.anchors = {
    bgSize: new WidthAnchor(props.children.text, props.children.bg, {
        paddingLeft: 10,
        paddingRight: 10
    }),
    deleteButtonPos: new PositionAnchor(props.children.bg, props.children.deleteButton, {
        top: -5,
        right: -5,
    }),
    propertyAddButtonPos: new PositionAnchor(props.children.bg, props.children.propertyAddButton, {
        left: 0,
        right: 0,
        top: -40
    }),
    propertyAddLinePos: new LineAnchor(props.children.propertyAddLine, {
        from: {
            shape: props.children.bg,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        to: {
            shape: props.children.bg,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    }),
    hasManyPos: new PositionAnchor(props.children.bg, props.children.hasManyConnectorHandle, {
        rihgt: 0,
        bottom: 0
    }),
    hasOnePos: new PositionAnchor(props.children.bg, props.children.hasOneConnectorHandle, {
        rihgt: 0,
        bottom: 0
    })
}


export default new Shape(props)