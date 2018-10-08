import Vector from "./Vector";

const MathHelper = {}


/**
 * 
 * @param {object} from { x: number, y: number }
 * @param {object} to { x: number, y: number }
 * @param {number} radius element of non-negative real numbers 
 * 
 * @returns {number[]}
 */
MathHelper.triangularProjection = function (from, to, radius) {

    // from_to vector's normal
    let N = {
        x: from.y - to.y,
        y: to.x - from.x
    }

    //length of N
    let l = Math.sqrt(Math.pow(N.x, 2) + Math.pow(N.y, 2))

    // normalize normal vector
    let NN = {
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
}

MathHelper.getNearestPointToRectangle = function (from, to, w, h) {
    let x = from.x,
        y = from.y

    let LTC = {
        x: x - w / 2,
        y: y - h / 2
    }

    let RBC = {
        x: LTC.x + w,
        y: LTC.y + h
    }

    let x_out, y_out

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
        from = Vector.fromObject(from)
        to = Vector.fromObject(to)
        let fromToVec = Vector.sub(to, from)
        try {
            let dist = fromToVec.getLength()
            fromToVec.normalize()
            fromToVec.mulEachBy(dist * 0.9)
            fromToVec.add(from)
            x_out = fromToVec.x
            y_out = fromToVec.y
        } catch (e) {
            //leave
        }
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
MathHelper.getSmoothPoint = function (from, half, to) {
    let from_half_vector = Vector.sub(half, from)


    let from_to_vector = Vector.sub(to, from)
    let from_X_vector = Vector.project(from_half_vector, from_to_vector)
    let X = Vector.add(from_X_vector, from)

    let X_half_vector = Vector.sub(half,X)
    let C = Vector.add(X_half_vector,from)

    X.add(C)
    X.divEachBy(2)

    C.add(X)
    C.divEachBy(2)

    return C
}

export default MathHelper