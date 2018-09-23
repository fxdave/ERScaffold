
const MathHelper = {}


/**
 * 
 * @param {object} from { x: number, y: number }
 * @param {object} to { x: number, y: number }
 * @param {number} radius 
 * 
 * @returns {number[]}
 */
MathHelper.triangularProjection = function(from,to,radius) {

        // from_to vector's normal
        let N = {
            x : from.y - to.y,
            y : to.x - from.x
        }

        //length of N
        let l = Math.sqrt(Math.pow(N.x,2)+Math.pow(N.y,2))

        // normalize normal vector
        let NN = {
            x : N.x / l,
            y : N.y / l
        }

        const A =  {
            x : to.x + NN.x * radius,
            y : to.y + NN.y * radius
        }

        const B =  {
            x : to.x - NN.x * radius,
            y : to.y - NN.y * radius
        }

        return [A.x,A.y,to.x,to.y,B.x,B.y]
}

MathHelper.getNearestPointToCircle= function(centerOfCircle,to,radius) {

    let absToVec = {
        x:to.x - centerOfCircle.x ,
        y:to.y - centerOfCircle.y
    }
    let l = Math.sqrt(Math.pow(absToVec.x,2)+Math.pow(absToVec.y,2))
    
    let norm = {
        x: absToVec.x / l,
        y: absToVec.y / l
    }

    let nearest = {
        x: centerOfCircle.x + norm.x * radius,
        y: centerOfCircle.y + norm.y * radius
    }

    if(l < radius) {
        nearest = to
    }

    return nearest
}

MathHelper.getNearestPointToRectangle = function(from,to,w,h) {
    let x = from.x,
            y = from.y

        let LTC = {
            x,y
        }

        let RBC = {
            x: x+ w,
            y: y+ h
        }

        let x_out,y_out

        if(to.x <= LTC.x) {
            x_out = LTC.x
        } else if(to.x > LTC.x && to.x < RBC.x) {
            x_out = to.x
        } else if (to.x >= RBC.x) {
            x_out = RBC.x
        }

        if(to.y <= LTC.y) {
            y_out = LTC.y
        } else if(to.y > LTC.y && to.y < RBC.y) {
            y_out = to.y
        } else if (to.y >= RBC.y) {
            y_out = RBC.y
        }

        return {
            x: x_out,
            y: y_out
        }
}

export default MathHelper