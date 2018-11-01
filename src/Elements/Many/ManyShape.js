import Shape from '../../Utils/Shape'
import LineShape from '../LineShape/LineShape'

function ManyShape() {

    let props = {}

    props.children = {
        line1 : new LineShape,
        line2 : new LineShape,
        line3 : new LineShape
    }

    return new Shape(props)
}

export default ManyShape