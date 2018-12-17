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
//import LineShape from '../LineShape/LineShape'
import CenterAnchor from '../../Utils/Anchors/CenterAnchor'
import BoundingBox from '../../Utils/Arranger/BoundingBox'
function EntityShape() {
    const props = {
        draggable: true
    }

    props.children = {
        hasManyConnectorHandle: new HasManyConnectorHandle,
        hasOneConnectorHandle: new HasOneConnectorHandle,
        bg: new RectangleShape,
        text: new EditableText,
        deleteButton: new DeleteButton,
        propertyAddButton: new AddButton,
        //propertyAddLine: new LineShape,
    }

    props._arranger_enabled = true
    props._arrangerBoundingType = function(element, to) {
        return BoundingBox(props.children.bg,to)
    }

    props.events = {
        onAddProperty: new EventRegister(props.children.propertyAddButton,'click'),
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
            top: -11,
            right: 16,
        }),
        hasManyPos: new PositionAnchor(props.children.bg, props.children.hasManyConnectorHandle, {
            right: 4,
            bottom: 4
        }),
        hasOnePos: new PositionAnchor(props.children.bg, props.children.hasOneConnectorHandle, {
            right: 4,
            bottom: 4
        })
    }

    return new Shape(props)
}
export default EntityShape