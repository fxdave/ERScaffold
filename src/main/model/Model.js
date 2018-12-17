import Entity from './Entity'
import Connection from './Connection'
import Property from './Property'

class Model {
    /**
     * 
     * @param {Object} data 
     */
    constructor(data) {
        this.entities = {}
        this.connections = []

        data.entities.forEach(entity => {
            this.entities[entity.id] = new Entity(entity.id,entity.name, entity.properties.map( v => {
                return new Property(v.id,v.name)
            }))
        })

        data.connections.forEach(connection => {
            this.connections.push(
                new Connection(
                    this.entities[connection.from], 
                    this.entities[connection.to], 
                    connection.type, 
                    connection.name, 
                    connection.id
                )
            )
        })

    }

    /**
     * @returns {Array<Entitiy>}
     */
    getEntities() {
        return Object.values(this.entities)
    }


    /**
     * @returns {Array<Connection>}
     */
    getConnections() {
        return this.connections
    }
}

export default Model