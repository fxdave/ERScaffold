
import Shape from '../../Utils/Shape'
import RhombusShape from '../RhombusShape/RhombusShape'
import EditableText from '../EditableText/EditableText'
import CustomAnchor from '../../Utils/Anchors/CustomAnchor'
import EventRegister from '../../Utils/EventRegister'
import CenterAnchor from '../../Utils/Anchors/CenterAnchor'
import DeleteButton from '../DeleteButton/DeleteButton'
import PositionAnchor from '../../Utils/Anchors/PositionAnchor'

function RelationShape() {

    let props = {}

    props.children = {
        bg: new RhombusShape,
        text: new EditableText,
        deleteButton: new DeleteButton
    }

    props.events = {
        onEditText : new EventRegister(props.children.bg, 'dblclick'),
        onEditText2: new EventRegister(props.children.text, 'dblclick', 'onEditText'),
        onDelete: new EventRegister(props.children.deleteButton,'click')
    }

    props.anchors = {
        bgSize: new CustomAnchor(props.children.bg, props.children.text, 'updated:width', function(){
            props.children.bg.shape.radius(props.children.text.shape.width()/2+15)
            props.children.bg.shape.dispatchEvent(new Event('updated:width'))
        }),
        textPos: new CenterAnchor(props.children.text),
        deleteButtonPos: new PositionAnchor(props.children.text, props.children.deleteButton, {
            top:-7,
            right:-7
        })
    }

    return new Shape(props)
}

export default RelationShape