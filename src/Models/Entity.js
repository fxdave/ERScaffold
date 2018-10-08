import Vector from '../Utils/Math/Vector'
import Model from './Abstract/Model';
class Entity extends Model {
    /**
     * 
     * @param {string} name 
     * @param {Vector} pos 
     */
    constructor(name,pos) {
        super()
        /** @member {string} */
        this.name = name

        /** @member {Vector} */
        this.pos = pos;

        /** @member {Property[]} */
        this.props = []
    }



    /**
     * 
     * @param {Property} prop 
     */
    addProperty(prop){
        this.props.push(prop)
    }


}

export default Entity