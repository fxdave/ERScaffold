import Stage from '../../Utils/Stage'
import Storage from './Storage'
import Entity from '../../Elements/Entity/Entity'
import ElementRenderer from '../../Utils/ElementRenderer'
import EntityLayer from '../../Layers/EntityLayer'
import ConnectionLayer from '../../Layers/ConnectionLayer'
import OneToManyConnection from '../../Elements/OneToManyConnection/OneToManyConnection'

class Viewport extends Stage {
    constructor() {
        super()
        this.storage = new Storage()
        this.layers = {
            connectionLayer: ConnectionLayer,
            entityLayer: EntityLayer,
        }
        this.handleAddEntity()
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
                    return v != this
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
            if(v.hasParticipant(entity))
                toDelete.push(v)
        }) 

        this.storage.connections = this.storage.connections.filter(v => {
            return !(v in toDelete)
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
    handleAddConnection(from, to, type) {
        let connection = ElementRenderer.render(new OneToManyConnection(from,to))
        this.storage.connections.push(connection)
    }
}
export default Viewport