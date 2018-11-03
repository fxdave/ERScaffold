import Shape from '../../Utils/Shape'
import One from '../One/One'
import Many from '../Many/Many'
import Relation from '../Relation/Relation'
import EventRegister from '../../Utils/EventRegister'

export default function () {
    let props = {}

    props.children = {
        one : new One,
        many: new Many,
        relation: new Relation
    }

    props.events = {
        onDelete: new EventRegister(props.children.relation, 'remove')
    } 

    return new Shape(props)
}