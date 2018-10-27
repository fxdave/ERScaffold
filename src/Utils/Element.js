import Emitter from './Emitter'
class Element extends Emitter {
    constructor() {
        super()
    }

    getShape(name) {
        return this.shape.props.children[name]
    }

    redraw(){
        let layer
        if( layer = this.shape.getLayer())
            layer.draw()
    }

    remove() {
        this.shape.remove()
        this.layer.draw()
        this.dispatchEvent(new Event("remove"))
    }
}

export default Element