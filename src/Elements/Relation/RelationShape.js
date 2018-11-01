
import Shape from '../../Utils/Shape'
import RhombusShape from '../RhombusShape/RhombusShape'
import EditableText from '../EditableText/EditableText'
import CustomAnchor from '../../Utils/Anchors/CustomAnchor'
import EventRegister from '../../Utils/EventRegister'
import CenterAnchor from '../../Utils/Anchors/CenterAnchor'

function RelationShape() {

    let props = {}

    props.children = {
        bg: new RhombusShape,
        text: new EditableText
    }

    props.events = {
        onEditText : new EventRegister(props.children.bg, 'dblclick'),
        onEditText2: new EventRegister(props.children.text, 'dblclick', 'onEditText')
    }

    props.anchors = {
        bgSize: new CustomAnchor(props.children.bg, props.children.text, 'updated:width', function(){
            props.children.bg.shape.radius(props.children.text.shape.width()+10)
            props.children.bg.shape.dispatchEvent(new Event('updated:width'))
        }),
        textPos: new CenterAnchor(props.children.text)
    }

    return new Shape(props)
}

export default RelationShape