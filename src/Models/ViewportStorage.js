import Entity from './Entity'
import Connection from './Abstract/Connection'
import ModelCollection from './ModelCollection'
import Model from './Abstract/Model'
class ViewportStorage extends Model {
    constructor() {
        super()
        this.entities = new ModelCollection()
        this.connections = new ModelCollection()
    }

    /**
     * 
     * @param {Entity} entity 
     * @returns {number} id
     */
    addEntity(entity) {
        return this.entities.add(entity)
    }

    /**
     * 
     * @param {Connection} connection
     * @returns {number} id 
     */
    addConnection(connection) {
        return this.connections.add(connection)
    }
}

export default ViewportStorage