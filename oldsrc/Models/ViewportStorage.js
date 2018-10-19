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
     * @param {Entity} entity 
     * @returns {number} id
     */
    addEntity(entity) {
        return this.entities.add(entity)
    }

    /**
     * @param {Entity} entity 
     */
    removeEntity(entity) {
        this.entities.remove(entity)
    }

    /**
     * @param {Connection} connection
     * @returns {number} id 
     */
    addConnection(connection) {
        return this.connections.add(connection)
    }

    /**
     * @param {Connection} connection
     */
    removeConnection(connection) {
        this.connections.remove(connection)
    }

}

export default ViewportStorage