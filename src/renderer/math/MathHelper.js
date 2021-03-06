import { Vec2 } from 'vecjs'

const MathHelper = {}

/**
 *
 * @param {object} from { x: number, y: number }
 * @param {object} to { x: number, y: number }
 * @param {number} radius element of non-negative real numbers
 *
 * @returns {number[]}
 */
MathHelper.triangularProjection = function(from, to, radius) {
    // from_to vector's normal
    const N = {
        x: from.y - to.y,
        y: to.x - from.x
    }

    // length of N
    const l = Math.sqrt(Math.pow(N.x, 2) + Math.pow(N.y, 2))

    // normalize normal vector
    const NN = {
        x: N.x / l,
        y: N.y / l
    }

    const A = {
        x: to.x + NN.x * radius,
        y: to.y + NN.y * radius
    }

    const B = {
        x: to.x - NN.x * radius,
        y: to.y - NN.y * radius
    }

    return [A.x, A.y, to.x, to.y, B.x, B.y]
}

/*
MathHelper.getNearestPointToCircle = function (centerOfCircle, to, radius) {

    centerOfCircle = Vector.fromObject(centerOfCircle)
    to = Vector.fromObject(to)

    let absToVec = Vector.sub(to, centerOfCircle)
    let nearest

    try {
        let l = absToVec.getLength()
        absToVec.normalize()

        if (l >= radius) {
            absToVec.mulEachBy(radius)
        } else {
            absToVec.mulEachBy(l * 0.9)
        }

        nearest = Vector.add(centerOfCircle, absToVec)

    } catch (e) {
        nearest = to
    }

    return nearest
} */

/**
 *
 * @param {Vector|Object} from
 * @param {number} from.x
 * @param {number} from.y
 * @param {Vector|Object} to
 * @param {number} to.x
 * @param {number} to.y
 * @param {number} w
 * @param {number} h
 */
MathHelper.getNearestPointToRectangle = function(
    from,
    to,
    w,
    h,
    centered = false
) {
    const x = from.x

    const y = from.y

    const LTC = {
        x: x - w / 2,
        y: y - h / 2
    }

    if (!centered) {
        LTC.x += w / 2
        LTC.y += h / 2
    }

    const RBC = {
        x: LTC.x + w,
        y: LTC.y + h
    }

    let x_out
    let y_out

    if (to.x <= LTC.x) {
        x_out = LTC.x
    } else if (to.x > LTC.x && to.x < RBC.x) {
        x_out = to.x
    } else if (to.x >= RBC.x) {
        x_out = RBC.x
    }

    if (to.y <= LTC.y) {
        y_out = LTC.y
    } else if (to.y > LTC.y && to.y < RBC.y) {
        y_out = to.y
    } else if (to.y >= RBC.y) {
        y_out = RBC.y
    }

    if (x_out == to.x && y_out == to.y) {
        to = new Vec2(to)

        const out = to
            .sub(from)
            .map(x => x * 0.9)
            .add(from)

        x_out = out.x
        y_out = out.y
    }

    return {
        x: x_out,
        y: y_out
    }
}

/**
 *
 * @param {Vector} from
 * @param {Vector} half
 * @param {Vector} to
 *
 * @returns {Vector}
 */
/*
MathHelper.getSmoothPoint = function (from, half, to) {
    let from_half_vector = Vector.sub(half, from)


    let from_to_vector = Vector.sub(to, from)
    let from_X_vector = Vector.project(from_half_vector, from_to_vector)
    let X = Vector.add(from_X_vector, from)

    let X_half_vector = Vector.sub(half,X)
    let C = Vector.add(X_half_vector,from)

    return C
}
*/

export default MathHelper
