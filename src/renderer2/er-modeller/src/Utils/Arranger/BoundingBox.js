
import MathHelper from '../Math/MathHelper'

export default function(element ,to) {
    let W = element.getClientRect().width,
        H = element.getClientRect().height,
        abs = element.getAbsolutePosition()

    let nearest = MathHelper.getNearestPointToRectangle({
        x: abs.x,
        y: abs.y
    }, to, W, H, element.preCentered)

    return nearest
}