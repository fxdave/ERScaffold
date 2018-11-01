import Shape from '../../Utils/Shape'
import LineShape from '../LineShape/LineShape'

function OneShape() {

    let props = {}

    props.children = {
        one : new LineShape
    }

    return new Shape(props)
}

export default OneShape