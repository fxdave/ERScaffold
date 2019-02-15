import Shape from '../../Utils/Shape'
import Many from '../Many/Many'
import Relation from '../Relation/Relation'
import EventRegister from '../../Utils/EventRegister'

export default function () {
    let props = {}

    props.children = {
        from : new Many,
        to: new Many,
        relation: new Relation
    }

    props.events = {
        onDelete: new EventRegister(props.children.relation, 'remove')
    } 

    return new Shape(props)
}