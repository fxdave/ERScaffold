import Element from '../../Utils/Element'
import Konva from '../../Vendor/Konva'
class LineShape extends Element {

    constructor(quadratic = false) {
        super()
        this.points = [0, 0]
        this.shape = new Konva.Line()
        if (quadratic)
            this.shape.sceneFunc((ctx, shape) => {
                ctx.beginPath()
                ctx.moveTo(this.shape.points()[0], this.shape.points()[1])
                let lesserPoints = this.shape.points().filter((v, i) => {
                    return i > 1
                })
                ctx.quadraticCurveTo(...lesserPoints)

                // (!) Konva specific method, it is very important
                ctx.fillStrokeShape(shape)
            })
    }
}
export default LineShape