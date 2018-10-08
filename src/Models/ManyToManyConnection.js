import Connection from './Abstract/Connection'
import Entity from './Entity'
class ManyToManyConnection extends Connection {
    /**
     * 
     * @param {Entity} from 
     * @param {Entity} to 
     */
    constructor(from, to) {
        super(from,to, "MANY_TO_MANY")
    }
}

export default ManyToManyConnection