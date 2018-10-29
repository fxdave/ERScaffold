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
            entityLayer: EntityLayer,
            connectionLayer: ConnectionLayer
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
     * @param {Entity} from 
     * @param {Entity} to 
     */
    handleAddConnection(from, to, type) {
        let connection = ElementRenderer.render(new OneToManyConnection)
        connection.setAnchor(from,to)
    }
}
export default Viewport