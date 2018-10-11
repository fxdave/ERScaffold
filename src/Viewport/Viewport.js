import Arranger from './Arranger'
import Stage from './Stage'
import Exporter from './Exporter'
import * as Elements from '../Elements/Elements'
import ViewportStorage from '../Models/ViewportStorage'
import EntityModel from '../Models/Entity'
import Vector from '../Utils/Math/Vector';

class Viewport extends Stage {
    /**
     * initialize arranger and stage
     */
    constructor() {
        super()
        this.arranger = new Arranger()
        this.viewportStorage = new ViewportStorage()
        this._setEvenetListeners()
    }

    /**
     * sets the event listeners
     */
    _setEvenetListeners() {
        //adding entity
        this.addEventListener('dblclick', (e) => {
            this.addEntityTo(e.clientX, e.clientY)
        })

        document.getElementById("export").addEventListener("click", ()=>{
            let exporter = new Exporter(this.viewportStorage)
            exporter.export()
        })
    }

    /**
     * adds entitiy and 
     * 
     * @param {number} x 
     * @param {number} y 
     */
    addEntityTo(x, y) {
        /**
         * make model
         */
        const ENTITIY_MODEL = new EntityModel("empty",new Vector(
            x - this.x(),
            y - this.y()
        ))
        this.viewportStorage.addEntity(ENTITIY_MODEL)

        /**
         * make view
         */
        const ENTITY_VIEW = new Elements.Entity(ENTITIY_MODEL)

        /**
         * make controller
         */
        ENTITY_VIEW.addEventListener("delete", () => {
            ENTITY_VIEW.remove()
            this.arranger.remove(ENTITY_VIEW)
            this.entityLayer.draw()
        })

        ENTITY_VIEW.addEventListener("connect", (e) => {
            var pos = this.getPointerPosition();
            var shape = this.entityLayer.getIntersection(pos);
            
            if(!shape) {
                return
            }

            let to = shape.parent
            while(!(to instanceof Elements.Entity))
                to = to.parent

            this.addConnection(e.detail.from,to,e.detail.type)
        })

        ENTITY_VIEW.addEventListener("addproperty", (e) => {
            const P = new Elements.Property()
        
            //requesting name
            P.text.editText()
            //add to arranger
            this.arranger.add(P)
            //add to the entitiy
            ENTITY_VIEW.add(P)

            P.setZIndex(0)
            P.addEventListener("delete", (e)=> {
                this._deleteProperty(P)
            })
            
        })

        this.entityLayer.add(ENTITY_VIEW)
        this.arranger.add(ENTITY_VIEW)
        this.entityLayer.draw()
    }

    /**
     * 
     * @param {Elements.Property} property 
     */
    _deleteProperty(property) {
        this.arranger.remove(property)
        property.remove()
    }

    /**
     * 
     * @param {Entity} from 
     * @param {Entity} to 
     * @param {string} type 
     */
    addConnection(from, to, type) {
        if (!from instanceof Elements.Entity && !to instanceof Elements.Entity) {
            console.error("Adding connection is failed due to parameters are not entities", from, to)
            return;
        }

        /**
         * handle overlapping connections
         * deletes if new connection is needed
         * and returns a type of the new connection
         * type can be null if no action is needed (same connection exsists)
         */

        type = this._handleOverlap(from, to, type)
        if (type)
            this._makeConnection(from, to, type)

    }


    /**
     * 
     * @param {Connection} connection 
     */
    removeConnection(connection) {
        this.arranger.remove(connection.relationEntity)
        connection.relationEntity.remove()
        connection.remove()
        this.connectionLayer.draw()
    }
    
    /**
     * 
     * @param {Entitiy} from 
     * @param {Entity} to 
     * @param {string} type 
     */
    _handleOverlap(from, to, type) {
        
        let same = Array.from(this.connectionLayer.children).find(old => {
            return old.to == to && old.from == from
        })

        let reversed = Array.from(this.connectionLayer.children).find(old => {
            return old.from == to && old.to == from
        })

        console.log(same);
        console.log(reversed);
        
        
        if (same) {
            let reversedType = type.replace("belongsTo", "hasMany")
            type = this._getOverridingConnectionType(reversedType, same)
            if (type !== null) this.removeConnection(same)
        }

        if (reversed) {
            type = this._getOverridingConnectionType(type, reversed)
            if (type !== null) this.removeConnection(reversed)
        }
        
        if(same && same.from == same.to && same instanceof Elements.Connections.OneToMany){
            type = "belongsToMany"
            if (type !== null) this.removeConnection(same)
        }

        return type

    }


    /**
     * setup and store a connection
     * @param {Entity} from 
     * @param {Entity} to 
     * @param {string} type 
     */
    _makeConnection(from, to, type) {
        
        let connection = this._getConnectionInstance(from, to, type)
        console.log(connection);
        this.arranger.add(connection.relationEntity)
        if (connection) {

            
            connection.addEventListener("delete", () => {
                this.removeConnection(connection)
                this.arranger.remove(connection.relationEntity)
            })

            connection.relationEntity.addEventListener("addproperty", (e) => {
                const P = new Elements.Property()
            
                //requesting name
                P.text.editText()
                //add to arranger
                this.arranger.add(P)
                //add to the entitiy
                connection.relationEntity.add(P)
    
                P.setZIndex(0)
                P.addEventListener("delete", (e)=> {
                    this._deleteProperty(P)
                })
            })

            this.connectionLayer.add(connection)
            this.connectionLayer.draw()
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