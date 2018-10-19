import Vector from '../Utils/Math/Vector'
import Model from './Abstract/Model'
class Property extends Model {
    /**
     * 
     * @param {string} name 
     * @param {Vector} pos 
     */
    constructor(name,pos){
        super()
        /** @member {string} */
        this.name = name

        /** @member {Vector} */
        this.pos = pos
    }
}

export default Property