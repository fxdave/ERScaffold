import MathHelper from '../math/MathHelper'

export default function(element, to) {
    const W = element.shape.width()

    const abs = element.shape.getAbsolutePosition()

    const nearest = MathHelper.getNearestPointToCircle(abs, to, W / 2)

    return nearest
}
