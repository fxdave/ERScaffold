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

    editText() {
        this.getShape('text').edit()
    }

    onAddProperty() {
        let property = this.addProperty()
        property.changeText()
    }

    addProperty() {
        let property = ElementRenderer.render(new PropertyWithLine, false, this.shape)
        this.model.properties.push(property.getPropertyModel())
        property.addEventListener('remove', () => {
            console.log('property is needed to be removed')
            this.model.properties = this.model.properties.filter(v => {
                return v != property.getPropertyModel()
            })
        })
        property.shape.setZIndex(0)
        return property
    }

    reconstruct(data) {
        this.getShape('text').setText(data.name)

        data.properties.forEach(v => {
            let property = this.addProperty()
            property.getShape('property').shape.x(v.x)
            property.getShape('property').shape.y(v.y)
            property.getShape('property').shape.dispatchEvent(new Event('updated:position'))
            property.getShape('property').reconstruct(v)
        })
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