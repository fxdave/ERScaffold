import Emitter from './Emitter'
import TempLayer from './TempLayer'
class Element extends Emitter {
    constructor() {
        super()
    }

    getShape(name) {
        return this.shape.props.children[name]
    }

    redraw() {
        let layer
        if (layer = this.shape.getLayer())
            layer.draw()
    }

    remove() {
        this.shape.remove()
        if(this.shape.props)
            for(let i in this.shape.props.children) {
                this.shape.props.children[i].remove()
            }

        if(this.layer)
            this.layer.draw()
        if(this.container && this.container.getLayer())
            this.container.getLayer().draw()
        this.dispatchEvent(new Event('remove'))
    }

    moveToTempLayer() {
        if (this.container) {
            this.oldLayer = this.container
        } else {
            this.oldLayer = this.layer
        }
        this.oldPos = {
            x: this.shape.x(),
            y: this.shape.y()
        }


        let stage = this.shape.getStage()
        let pos = this.shape.getAbsolutePosition()
        this.shape.x(pos.x - stage.x())
        this.shape.y(pos.y - stage.y())

        let layer = this.shape.getLayer()

        this.shape.moveTo(TempLayer)

        if (layer)
            layer.draw()

    }

    moveToPreviousLayer() {
        this.shape.moveTo(this.oldLayer)
        this.shape.x(this.oldPos.x)
        this.shape.y(this.oldPos.y)
        TempLayer.draw()
    }
}

export default Element