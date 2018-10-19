import Stage from '../../Utils/Stage'
import Storage from './Storage'
import Entity from '../../Elements/Entity/Entity'
import ElementRenderer from '../../Utils/ElementRenderer'
class Viewport extends Stage {
    constructor() {
        this.storage = new Storage()
        this.handleAddEntity()
    }

    handleAddEntity() {
        this.setEventListener("dblclick", e => {
            const entity = ElementRenderer.render(Entity)
            this.storage.entities.push(entity.model)
        })
    }
}
export default new Viewport()