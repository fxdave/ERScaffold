import Connection from './Abstract/Connection'
import Entity from './Entity'
class OneToOneConnection extends Connection {
    /**
     * 
     * @param {Entity} from 
     * @param {Entity} to 
     */
    constructor(from, to) {
        super(from,to, "ONE_TO_ONE")
    }
}

export default OneToOneConnection