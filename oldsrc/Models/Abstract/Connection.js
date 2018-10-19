import Entity from '../Entity'
import Property from '../Property'
import Model from './Model'
class Connection extends Model {
    /**
     * 
     * @param {Entity} from 
     * @param {Entity} to
     * @param {string} type
     */
    constructor(from, to, type) {
        super()

        /** @member {Entity} */
        this.from = from
        
        /** @member {Entity} */
        this.to = to

        /** @member {string} */
        this.type = type

        /** @member {string} */
        this.name = "";

        /** @member {Property[]} */
        this.props = [];

    }

    /**
     * 
     * @param {Property} prop 
     */
    addProperty(prop){
        this.props.push(prop)
    }


}

export default Connection