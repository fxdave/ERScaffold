import Shape from '../../Utils/Shape'
import RectangleShape from '../RectangleShape/RectangleShape'
import EditableText from '../EditableText/EditableText'
import DeleteButton from '../DeleteButton/DeleteButton'
import AddButton from '../AddButton/AddButton'
import HasManyConnectorHandle from '../HasManyConnectorHandle/HasManyConnectorHandle'
import HasOneConnectorHandle from '../HasOneConnectorHandle/HasOneConnectorHandle'
import EventRegister from '../../Utils/EventRegister'
import WidthAnchor from '../../Utils/Anchors/WidthAnchor'
import PositionAnchor from '../../Utils/Anchors/PositionAnchor'
import LineAnchor from '../../Utils/Anchors/LineAnchor'
import LineShape from '../LineShape/LineShape'
import CenterAnchor from '../../Utils/Anchors/CenterAnchor'
function EntityShape() {
    const props = {
        draggable: true
    }

    props.children = {
        bg: new RectangleShape,
        text: new EditableText,
        deleteButton: new DeleteButton,
        propertyAddButton: new AddButton,
        propertyAddLine: new LineShape,
        hasManyConnectorHandle: new HasManyConnectorHandle,
        hasOneConnectorHandle: new HasOneConnectorHandle,
    }

    props.events = {
        onEditText: new EventRegister(props.children.bg,'dblclick'),
        onEditText2: new EventRegister(props.children.text,'dblclick', 'onEditText'),
        onDelete: new EventRegister(props.children.deleteButton, 'click'),
        onTextChange: new EventRegister(props.children.text, 'updated:text'),
        onHasManyConnect: new EventRegister(props.children.hasManyConnectorHandle, 'connect'),
        onHasOneConnect: new EventRegister(props.children.hasOneConnectorHandle, 'connect')
    }

    props.anchors = {
        bgPos: new CenterAnchor(props.children.bg),
        bgSize: new WidthAnchor(props.children.text, props.children.bg, {
            padding: 20,
        }),
        textPos: new PositionAnchor(props.children.bg, props.children.text, {
            top:0,
            left:0,
            right:0,
            bottom:0,
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
                element: props.children.bg,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            },
            to: {
                element: props.children.bg,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        }),
        hasManyPos: new PositionAnchor(props.children.bg, props.children.hasManyConnectorHandle, {
            right: 0,
            bottom: 0
        }),
        hasOnePos: new PositionAnchor(props.children.bg, props.children.hasOneConnectorHandle, {
            right: 0,
            bottom: 0
        })
    }

    return new Shape(props)
}
export default EntityShape