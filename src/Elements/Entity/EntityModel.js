import Model from '../../Utils/Model'
class EntityModel extends Model {
    constructor(entityShape) {
        super()
        /** @var {PropertyModel[]} */
        this.properties = []

        /** @var {EntityShape} */
        this.shape = entityShape

        /** @var {string} */
        this.name = 'empty'
    }

    toArray() {
        return {
            id: this.getID(),
            x: this.shape.x(),
            y: this.shape.y(),
            name: this.name,
            properties: this.properties.map(v => {
                return v.toArray()
            })
        }
    }
}
export default EntityModel