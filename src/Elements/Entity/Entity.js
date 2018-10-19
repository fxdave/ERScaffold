import EntityModel from './EntityModel'
//import EntityShape from './EntityShape'
import EntityStyle from './EntityStyle'
import EntityLayer from '../../Layers/EntityLayer'
import Element from '../../Utils/Element'
class Entity extends Element {
    constructor() {
        super()
        this.layer = EntityLayer
        this.model = new EntityModel()
        //this.shape = EntityShape
        this.style = EntityStyle
    }

    onTextChange() {

    }

    onHasManyConnect() {

    }

    onHasOneConnect() {
        
    }
}

export default Entity