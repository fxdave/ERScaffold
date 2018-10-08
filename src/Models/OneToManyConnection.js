import Connection from './Abstract/Connection'
import Entity from './Entity'

class OneToManyConnection extends Connection {
    /**
     * 
     * @param {Entity} from 
     * @param {Entity} to 
     */
    constructor(from, to) {
        super(from,to, "ONE_TO_MANY")
    }
}

export default OneToManyConnection