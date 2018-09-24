import Arranger from './Arranger'
import Stage from './Stage'

import * as Elements from '../Elements/Elements'

class Viewport {
    /**
     * initialize arranger and stage
     */
    constructor() {
        this.arranger = new Arranger()
        this.stage = new Stage()

        this._setEvenetListeners()
    }

    /**
     * sets the event listeners
     */
    _setEvenetListeners() {
        //adding entity
        this.stage.addEventListener('dblclick', (e) => {
            this.addEntityTo(e.clientX, e.clientY)
        })
    }

    /**
     * adds entitiy and 
     * 
     * @param {number} x 
     * @param {number} y 
     */
    addEntityTo(x, y) {
        const E = new Elements.Entity({
            x: x - this.stage.x(),
            y: y - this.stage.y()
        })
        E.addEventListener("delete", () => {
            E.remove()
            this.arranger.remove(E)
            this.stage.entityLayer.draw()
        })
        this.stage.entityLayer.add(E)
        this.arranger.add(E)
        this.stage.entityLayer.draw()
    }


    /**
     * 
     * @param {Entity} from 
     * @param {Entity} to 
     * @param {string} type 
     */
    addConnection(from, to, type) {
        if (from instanceof Elements.Entity && to instanceof Elements.Entity) {
            console.error("Adding connection is failed due to parameters are not entities", from, to)
            return;
        }

        /**
         * handle overlapping connections
         * deletes if new connection is needed
         * and returns a type of the new connection
         * type can be null if no action is needed (same connection exsists)
         */

        type = this.handleOverlap(from, to, type)

        //make connection

        if (type)
            this.makeConnection(from, to, type)

    }


    /**
     * 
     * @param {Connection} connection 
     */
    removeConnection(connection) {
        this.arranger.remove(connection.relationEntity)
        connection.relationEntity.remove()
        connection.remove()
        this.stage.connectionLayer.draw()
        this.stage.connectionEntityLayer.draw()
    }
    
    /**
     * 
     * @param {Entitiy} from 
     * @param {Entity} to 
     * @param {string} type 
     */
    _handleOverlap(from, to, type) {
        let same = this.stage.connectionLayer.children.find(old => {
            return old.to == to && old.from == from
        })

        let reversed = this.stage.connectionLayer.children.find(old => {
            return old.from == to && old.to == from
        })

        if (same) {
            let reversedType = type.replace("belongsTo", "hasMany")
            type = this._getOverridingConnectionType(reversedType, old)
        }

        if (reversed) {
            type = this._getOverridingConnectionType(type, same)
        }

        if (same || reversed) {
            if (type !== null) this.removeConnection(old)
        }

    }


    /**
     * setup and store a connection
     * @param {Entity} from 
     * @param {Entity} to 
     * @param {string} type 
     */
    _makeConnection(from, to, type) {
        let connection = this._getConnectionInstance(from, to, type)
        if (connection) {
            connection.addEventListener("delete", () => {
                this.removeConnection(connection)
            })

            this.stage.connectionLayer.add(connection)
            this.stage.connectionLayer.draw()
        }
    }

    /**
     * 
     * @param {string} connectionName 
     * @param {Entity} from 
     * @param {Entity} to 
     * 
     * @returns {Connection}
     */
    _getConnectionInstance(from, to, connectionName) {
        switch (connectionName) {
            case "hasOne":
                return new Elements.Connections.OneToOne({
                    from: from,
                    to: to
                })
            case "hasMany":
                return new Elements.Connections.OneToMany({
                    from: from,
                    to: to
                })
            case "belongsTo":
                return new Elements.Connections.OneToMany({
                    from: to,
                    to: from
                })
            case "belongsToMany":
                return new Elements.Connections.ManyToMany({
                    from,
                    to
                })
            default:
                return
        }
    }


    /**
     * More generic connection should overwrite the less generic
     * for e.g if there is a OneToMany connection and we make ManyToOne connection 
     * then it will be ManyToMany connection
     * 
     * @param {string} newType 
     * @param {Connection} old 
     */
    _getOverridingConnectionType(newType, old) {
        let newTypeShouldBe = null;
        if (old instanceof Elements.Connections.OneToOne) {
            if (newType != "hasOne") {
                newTypeShouldBe = newType
            }
        } else if (old instanceof Elements.Connections.OneToMany) {
            if (newType == "hasMany") {
                newTypeShouldBe = "belongsToMany"
            }
        }
        return newTypeShouldBe;
    }


}
export default Viewport