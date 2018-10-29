import Stage from '../../Utils/Stage'
import Storage from './Storage'
import Entity from '../../Elements/Entity/Entity'
import ElementRenderer from '../../Utils/ElementRenderer'
import EntityLayer from '../../Layers/EntityLayer'
class Viewport extends Stage {
    constructor() {
        super()
        this.storage = new Storage()
        this.layers = {
            entityLayer: EntityLayer
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
        })

    }
}
export default Viewport