import Shape from '../../Utils/Shape'
import One from '../One/One'

function ManyShape() {

    let props = {}

    props.children = {
        line1 : new One,
        line2 : new One,
        line3 : new One
    }

    return new Shape(props)
}

export default ManyShape