
import MathHelper from '../Math/MathHelper'

class BoundingBox {

    static getNearestPoint(element ,to) {
        let W = element.shape.width(),
            H = element.shape.height(),
            abs = element.shape.getAbsolutePosition()

        let nearest = MathHelper.getNearestPointToRectangle({
            x: abs.x,
            y: abs.y
        }, to, W, H)

        return nearest
    }
}

export default BoundingBox