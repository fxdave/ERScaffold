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
import Importer from '../../Utils/Importer'
import Base64 from '../../Utils/Base64'
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

        document.querySelector('#import').addEventListener('click', () => {

            Importer.import((result) => {
                let data = result.split(',')
                let decoded = JSON.parse(Base64.decode(data[1]))
                this.reconstruct(decoded)                
            })

        })
        
    }

    reconstruct(data) {
        let entities = {}
        data.entities.forEach( v => {
            let entity = this.addEntity({
                x: v.x,
                y: v.y
            })

            entity.reconstruct(v)
            entities[v.id] = entity
        })
        data.connections.forEach( v => {
            let method = null
            if(v.type == 'OneToOne') method = OneToOneConnection
            if(v.type == 'OneToMany') method = OneToManyConnection
            if(v.type == 'ManyToMany') method = ManyToManyConnection

            let connection = this.addConnection(method, entities[v.from], entities[v.to])
            connection.reconstruct(v)
        })
    }

    handleAddEntity() {
        this.addEventListener('dblclick', e => {
            let entity = this.addEntity({
                x: this.subtractDragX(e.clientX),
                y: this.subtractDragY(e.clientY)
            })

            entity.editText()
        })

    }

    addEntity(pos) {
        let entity = ElementRenderer.render(new Entity)
        this.storage.entities.push(entity.model)
        entity.shape.x(pos.x)
        entity.shape.y(pos.y)
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

        return entity

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
        from = from.model
        to = to.model

        for (let v of this.storage.connections) {
            if(v.from == from && v.to == to && from == to){
                return { type: v.connectionType + 'Recursive', instance: v.getParent() }
            }
            if (v.from == from && v.to == to) {
                return { type: v.connectionType, instance: v.getParent() }
            }
            if (v.from == to && v.to == from) {
                return { type: v.connectionType.replace('OneToMany', 'ManyToOne'), instance: v.getParent() }
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

            this.addConnection(method, from, to)
        }
    }

    addConnection(method, from, to) {
        let connection = ElementRenderer.render(new method(from, to))
        this.storage.connections.push(connection.model)

        connection.addEventListener('remove', ()=>{
            this.storage.connections = this.storage.connections.filter(v => {
                return v != connection.model
            })
        })
        return connection
    }
}
export default Viewport