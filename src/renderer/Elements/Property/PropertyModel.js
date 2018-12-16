
import Model from '../../Utils/Model'

class PropertyModel extends Model {
    constructor(shape) {
        super()

        this.name = 'empty'
        /** @var {PropertyShape} */
        this.shape = shape
    }

    toArray() {
        return {
            id: this.getID(),
            name: this.name,
            x: this.shape.x(),
            y: this.shape.y()
        }
    }
}

export default PropertyModel