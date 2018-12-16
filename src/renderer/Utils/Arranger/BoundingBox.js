
import MathHelper from '../Math/MathHelper'

export default function(element ,to) {
    let W = element.shape.width(),
        H = element.shape.height(),
        abs = element.shape.getAbsolutePosition()

    let nearest = MathHelper.getNearestPointToRectangle({
        x: abs.x,
        y: abs.y
    }, to, W, H, element.shape.preCentered)

    return nearest
}