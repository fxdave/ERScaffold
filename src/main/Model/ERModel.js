import Entity from './Entity'
import Connection from './Connection'
import Property from './Property'
import {
    HasManyRelation,
    HasOneRelation,
    BelongsToRelation,
    BelongsToManyRelation
} from './Relation'

class ERModel {
    /**
     *
     * @param {Object} data
     */
    constructor(data) {

        this.appName = data.appName
        this.entities = {}
        this.connections = []

        this._fillEntities(data.entities)
        this._fillConnections(data.conns)
    }

    /**
     *
     * @param {Object[]} entities
     */
    _fillEntities(entities) {
        entities.forEach(entity => {
            this.entities[entity.id] = new Entity(
                entity.id,
                entity.name,
                entity.props.map(v => new Property(v.id, v.name)),
                entity.x,
                entity.y,
                entity.context
            )
        })
    }

    /**
     *
     * @param {Object[]} conns
     */
    _fillConnections(conns) {
        conns.forEach(connection => {
            const c = new Connection(
                this.entities[connection.from],
                this.entities[connection.to],
                connection.type,
                connection.name,
                connection.id
            )

            this.connections.push(c)

            let fromRelation = null
            let toRelation = null

            if (connection.type == 'OneToOne') {
                fromRelation = HasOneRelation
                toRelation = BelongsToRelation
            } else if (connection.type == 'OneToMany') {
                fromRelation = HasManyRelation
                toRelation = BelongsToRelation
            } else if (connection.type == 'ManyToMany') {
                fromRelation = BelongsToManyRelation
                toRelation = BelongsToManyRelation
            }

            this.entities[connection.from].addRelation(
                new fromRelation(
                    this.entities[connection.from],
                    this.entities[connection.to]
                )
            )

            this.entities[connection.to].addRelation(
                new toRelation(
                    this.entities[connection.to],
                    this.entities[connection.from]
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

export default ERModel
