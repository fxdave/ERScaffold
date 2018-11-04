import EntityModel from './EntityModel'
import EntityShape from './EntityShape'
import EntityStyle from './EntityStyle'
import EntityLayer from '../../Layers/EntityLayer'
import Element from '../../Utils/Element'
class Entity extends Element {
    constructor() {
        super()
        this.layer = EntityLayer
        this.model = new EntityModel
        this.shape = EntityShape()
        this.style = EntityStyle
    }

    mounted() {
        this.getShape('text').edit()
    }

    onAddProperty() {
        console.log('prop added')
        
    }

    onEditText(e) {
        e.cancelBubble = true
        this.getShape('text').edit()
    }

    onDelete() {
        console.log('entitiy is deleted!')
        this.remove()
    }

    onTextChange() {
        console.log('text has changed!')
        
    }

    onHasManyConnect(e) {
        this.dispatchEvent(new CustomEvent('hasManyConnect', {
            detail: e.evt.detail
        }))
    }

    onHasOneConnect(e) {
        this.dispatchEvent(new CustomEvent('hasOneConnect', {
            detail: e.evt.detail
        }))
    }
}

export default Entity