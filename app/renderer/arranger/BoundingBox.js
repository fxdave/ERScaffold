import MathHelper from '../math/MathHelper'

export default function (element, to) {
    const W = element.getClientRect().width

    const H = element.getClientRect().height

    const abs = element.getAbsolutePosition()

    let absPos = {
        x: abs.x,
        y: abs.y
    }
    const nearest = MathHelper.getNearestPointToRectangle(
        absPos,
        to,
        W,
        H,
        element._arrangerElementCentered
    )

    return nearest
}