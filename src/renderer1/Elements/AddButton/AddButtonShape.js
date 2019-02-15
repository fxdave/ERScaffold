import Shape from '../../Utils/Shape'
import CircleShape from '../CircleShape/CircleShape'
import TextShape from '../TextShape/TextShape'

function AddButtonShape() {
    const props = {}

    props.children = {
        bg: new CircleShape,
        text: new TextShape
    }

    return new Shape(props)
}

export default AddButtonShape