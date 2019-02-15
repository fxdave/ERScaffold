import MathHelper from '../Math/MathHelper'

export default function(element ,to) {
    let W = element.shape.width(),
        abs = element.shape.getAbsolutePosition()

    let nearest = MathHelper.getNearestPointToCircle(abs,to,W/2)

    return nearest
}