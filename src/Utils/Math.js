/**
 * 
 * @param {{ x: number, y: number }} from 
 * @param { x: number, y: number }} to 
 * @param {number} radius 
 * 
 * @returns {number[]}
 */
Math.triangularProjection = function(from,to,radius) {

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

Math.getNearestPointToCircle= function(centerOfCircle,to,radius) {

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