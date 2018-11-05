import Stage from '../../Utils/Stage'
import Storage from './Storage'
import Entity from '../../Elements/Entity/Entity'
import ElementRenderer from '../../Utils/ElementRenderer'
import EntityLayer from '../../Layers/EntityLayer'
import ConnectionLayer from '../../Layers/ConnectionLayer'
import OneToManyConnection from '../../Elements/OneToManyConnection/OneToManyConnection'
import OneToOneConnection from '../../Elements/OneToOneConnection/OneToOneConnection'
import ManyToManyConnection from '../../Elements/ManyToManyConnection/ManyToManyConnection'
import Exporter from '../../Utils/Exporter'

class Viewport extends Stage {
    constructor() {
        super()
        this.storage = new Storage()
        this.layers = {
            connectionLayer: ConnectionLayer,
            entityLayer: EntityLayer,
        }
        this.handleAddEntity()
        this.handleExport()
        this.handleImport()
    }


    handleExport() {
        document.querySelector('#export').addEventListener('click', () => {
            console.log(this.storage.toArray())
            Exporter.export(this.storage,'ermodel','json')
        })
        
    }

    handleImport() {

    }

    handleAddEntity() {
        this.addEventListener('dblclick', e => {

            let entity = ElementRenderer.render(new Entity)
            this.storage.entities.push(entity.model)
            entity.shape.x(this.subtractDragX(e.clientX))
            entity.shape.y(this.subtractDragY(e.clientY))
            entity.layer.draw()

            entity.addEventListener('remove', () => {

                this.removeConnectionsWith(entity)

                this.storage.entities = this.storage.entities.filter(v => {
                    return v != entity.model
                })

                entity = undefined
            })

            entity.addEventListener('hasManyConnect', e => {
                this.handleAddConnection(entity, e.detail.to, 'hasMany')
            })

            entity.addEventListener('hasOneConnect', e => {
                this.handleAddConnection(entity, e.detail.to, 'hasOne')
            })


        })

    }

    /**
     * 
     * @param {Entity} entity 
     */
    removeConnectionsWith(entity) {
        let toDelete = []
        this.storage.connections.forEach(v => {
            if (v.hasParticipant(entity))
                toDelete.push(v)
        })

        let toDeleteModels = toDelete.map(v => {
            return v.model
        })
        this.storage.connections = this.storage.connections.filter(v => {
            return !(v in toDeleteModels)
        })

        toDelete.forEach(v => {
            v.remove()
        })
    }

    /**
     * 
     * @param {Entity} from 
     * @param {Entity} to 
     */
    getExistedConnectionType(from, to) {
        for (let v of this.storage.connections) {
            if(v.hasFrom(from) && v.hasTo(to), from == to){
                if (v instanceof OneToOneConnection)
                    return { type: 'OneToOneRecursive', instance: v }
                if (v instanceof OneToManyConnection)
                    return { type: 'OneToManyRecursive', instance: v }
                if (v instanceof ManyToManyConnection)
                    return { type: 'ManyToManyRecursive', instance: v }
            }
            if (v.hasFrom(from) && v.hasTo(to)) {
                if (v instanceof OneToOneConnection)
                    return { type: 'OneToOne', instance: v }
                if (v instanceof OneToManyConnection)
                    return { type: 'OneToMany', instance: v }
                if (v instanceof ManyToManyConnection)
                    return { type: 'ManyToMany', instance: v }
            }
            if (v.hasFrom(to) && v.hasTo(from)) {
                if (v instanceof OneToOneConnection)
                    return { type: 'OneToOne', instance: v }
                if (v instanceof OneToManyConnection)
                    return { type: 'ManyToOne', instance: v }
                if (v instanceof ManyToManyConnection)
                    return { type: 'ManyToMany', instance: v }
            }
        }
        return { type: 'default', instance: null }
    }

    /**
     * 
     * @param {Entity} from 
     * @param {Entity} to 
     */
    handleAddConnection(from, to, type) {

        let onCreateConfig = {
            hasOne: {
                OneToOne: null,
                OneToOneRecursive: null,
                OneToMany: null,
                OneToManyRecursive: null,
                ManyToOne: null,
                ManyToMany: null,
                ManyToManyRecursive: null,
                default: OneToOneConnection
            },
            hasMany: {
                OneToOne: OneToManyConnection,
                OneToOneRecursive: OneToManyConnection,
                OneToMany: null,
                OneToManyRecursive: ManyToManyConnection,
                ManyToOne: ManyToManyConnection,
                ManyToMany: null,
                ManyToManyRecursive: null,
                recursive: ManyToManyConnection,
                default: OneToManyConnection
            }
        }

        let existed = this.getExistedConnectionType(from, to)
        let method = onCreateConfig[type][existed.type]
        if (method !== null) {
            if (existed.instance)
                existed.instance.remove()

            if(existed.type != 'default') type = existed.type

            let connection = ElementRenderer.render(new method(from, to))
            this.storage.connections.push(connection.model)

            connection.addEventListener('remove', ()=>{
                this.storage.connections = this.storage.connections.filter(v => {
                    return v != connection.model
                })
            })
        }
    }
}
export default Viewport