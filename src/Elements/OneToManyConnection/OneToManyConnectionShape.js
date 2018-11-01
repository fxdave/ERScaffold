import Shape from '../../Utils/Shape'
import One from '../One/One'
import Many from '../Many/Many'
import Relation from '../Relation/Relation'

export default function () {
    let props = {}

    props.children = {
        one : new One,
        many: new Many,
        relation: new Relation
    }

    return new Shape(props)
}