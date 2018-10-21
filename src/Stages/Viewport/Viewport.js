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
        this.addEventListener("dblclick", e => {
            const entity = ElementRenderer.render(Entity)
            this.storage.entities.push(entity.model)
        })
    }
}
export default Viewport