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
}

export default Element