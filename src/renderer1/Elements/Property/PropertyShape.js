
import Shape from '../../Utils/Shape'
import EllipseShape from '../EllipseShape/EllipseShape'
import EditableText from '../EditableText/EditableText'
import DeleteButton from '../DeleteButton/DeleteButton'
import CustomAnchor from '../../Utils/Anchors/CustomAnchor'
import CenterAnchor from '../../Utils/Anchors/CenterAnchor'
import PositionAnchor from '../../Utils/Anchors/PositionAnchor'
import EventRegister from '../../Utils/EventRegister'
import BoundingBox from '../../Utils/Arranger/BoundingBox'

function PropertyShape() {
    const props = {}


    props.draggable = true

    props.children = {
        bg: new EllipseShape,
        text: new EditableText,
        deleteButton: new DeleteButton
    }


    props._arranger_enabled = true
    props._arrangerBoundingType = function(element, to) {
        return BoundingBox(props.children.bg,to)
    }

    props.events = {
        onDelete: new EventRegister(props.children.deleteButton,'click'),
        onChangeText: new EventRegister(props.children.bg, 'dblclick'),
        onChangeText2: new EventRegister(props.children.text, 'dblclick', 'onChangeText'),
        onTextChange: new EventRegister(props.children.text, 'updated:text'),
    }

    props.anchors = {
        bgWidth: new CustomAnchor(props.children.bg, props.children.text, ['updated:width'], ()=>{
            props.children.bg.shape.radius({
                x: props.children.text.shape.width()/2 + 20,
                y: 20
            })
            props.children.bg.shape.dispatchEvent(new Event('updated:width'))
        }),
        centerText: new CenterAnchor(props.children.text),
        positionAnchor: new PositionAnchor(props.children.bg, props.children.deleteButton, {
            right:0
        },true)
    }

    return new Shape(props)
}

export default PropertyShape