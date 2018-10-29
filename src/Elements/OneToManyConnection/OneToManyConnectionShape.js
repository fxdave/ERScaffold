import Shape from '../../Utils/Shape'
import LineShape from '../LineShape/LineShape'
export default function () {
    let props = {}

    props.children = {
        one : new LineShape,
        many1 : new LineShape,
        many2 : new LineShape,
        many3 : new LineShape
    }

    props.anchors = {
        
    }

    return new Shape(props)
}