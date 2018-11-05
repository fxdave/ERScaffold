import EntityModel from './EntityModel'
import EntityShape from './EntityShape'
import EntityStyle from './EntityStyle'
import EntityLayer from '../../Layers/EntityLayer'
import Element from '../../Utils/Element'
import ElementRenderer from '../../Utils/ElementRenderer'
import PropertyWithLine from '../PropertyWithLine/PropertyWithLine'
class Entity extends Element {
    constructor() {
        super()
        this.layer = EntityLayer
        this.shape = EntityShape()
        this.model = new EntityModel(this.shape)
        this.style = EntityStyle
    }

    mounted() {
        this.getShape('text').edit()
    }

    onAddProperty() {
        let property = ElementRenderer.render(new PropertyWithLine, false, this.shape)
        this.model.properties.push(property.getPropertyModel())
        property.addEventListener('remove', () => {
            console.log('property is needed to be removed')
            this.model.properties = this.model.properties.filter(v => {
                return v != property.getPropertyModel()
            })
        })
        property.changeText()
        property.shape.setZIndex(0)
        this.redraw()
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
        let text = this.getShape('text').shape.text()
        console.log('text has changed to: '+text+'!')
        this.model.name = text
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