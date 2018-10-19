import Vector from '../Utils/Math/Vector'
import Model from './Abstract/Model';
import ModelCollection from './ModelCollection'
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

        /** @member {ModelCollection} */
        this.props = new ModelCollection
    }



    /**
     * 
     * @param {Property} prop 
     */
    addProperty(prop){
        this.props.add(prop)
    }

    /**
     * 
     * @param {Property} prop 
     */
    removeProperty(prop){
        this.props.remove(prop)
    }


}

export default Entity