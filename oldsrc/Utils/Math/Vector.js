/**
 * @author Dávid Biró <dbiro97@gmail.com>
 * @module Math
 * @license MIT
 */
export default class Vector {

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0,y = 0){
        this.x = x
        this.y = y
    }

    /**
     * 
     * @param {Object} obj
     * @param {number} obj.x
     * @param {number} obj.y
     * 
     * @returns {Vector}
     */
    static fromObject(obj) {
        return new Vector(obj.x,obj.y)
    }

    /**
     * returns one of the normals of the 'vec' Vector
     * @param {Vector} vec
     * @param {number} normalID -1 or 1
     * @returns {Vector}
     */
    static getNormal(vec, normalID = 1) {
        return new Vector(vec.y*normalID,-vec.x*normalID)
    }

    /**
     * returns the square of the distance of two Point (vector)
     * @param {Vector} a 
     * @param {Vector} b 
     * 
     * @returns {number}
     */
    static getDistanceSquare(a,b) {
        return Math.pow(b.x-a.x,2) + Math.pow(b.y - a.y,2)
    }
    
    /**
     * returns the distance of two point (vector)
     * 
     * @param {Vector} a 
     * @param {Vector} b 
     * 
     * @returns {number}
     */
    static getDistance(a,b) {
        return Math.sqrt(Vector.getDistanceSquare(a,b))
    }

    /**
     * returns the dot product of two vectors
     * @param  {Vector} a 
     * @param  {Vector} b 
     * @return {number}
     */
    static dot(a,b) {
        return a.x * b.x + a.y * b.y
    }

    /**
     * calc the sum of two vectors
     * @param {Vector} a 
     * @param {Vector} b 
     * @returns {Vector}
     */
    static add(a,b) {
        return a.clone().add(b)
    }

    /**
     * calc the sub
     * @param {Vector} a 
     * @param {Vector} b 
     * @returns {Vector}
     */
    static sub(a,b) {
        return a.clone().sub(b)
    }

    /**
     * multiplication by coordinates
     * @param {Vector} a 
     * @param {Vector} b 
     * @returns {Vector}
     */
    static mul(a,b) {
        return a.clone().mul(b)
    }

    /**
     * division by coordinates
     * @param {Vector} a 
     * @param {Vector} b 
     * @returns {Vector}
     */
    static div(a,b) {
        return a.clone().div(b)
    }

    /**
     * project a to the b 
     * @param {Vector} a 
     * @param {Vector} b 
     * @returns {Vector}
     */
    static project(a,b) {
        let ls = b.getLengthSquare()

        if(ls) {
            let furrier = Vector.dot(a,b) / ls
            b = b.clone()
            b.mulEachBy(furrier)
            return b
        } else {
            return new Vector(0,0)
        }
    }


    /**
     * returns the length
     * @returns {number}
     */
    getLength() {
       return Math.sqrt(this.getLengthSquare())
    }

    /**
     * return the square of length (faster then get the length)
     * @returns {number}
     */
    getLengthSquare() {
        return Math.pow(this.x,2) + Math.pow(this.y,2)
    }

    /**
     * normalizes this vector
     * @throws {string} "nullVectorNormalization"
     */
    normalize() {
        let length = this.getLength()
        if(length != 0) {
            this.x = this.x / length
            this.y = this.y / length
        } else {
            throw "nullVectorNormalization"
        }
    }

    /**
     * returns a clone of this vector
     * @returns {Vector}
     */
    clone(){
        return new Vector(this.x,this.y)
    }

    /**
     * multiplies each coordinates by a factor
     * @param {number} factor
     * @return {Vector} this
     */
    mulEachBy(factor) {
        this.x *= factor
        this.y *= factor
        return this
    }

    /**
     * divides each coordinate of this vector by the given number
     * @param {number} divisor 
     * @return {Vector} this
     * @throws {string} "nullDivisor"
     */
    divEachBy(divisor) {
        if(divisor != 0) {
            this.x /= divisor
            this.y /= divisor
            return this
        }
        throw "nullDivisor"
    }

    /**
     * adds the given number to each coordinate of this vector
     * @param {number} toAdd 
     * @return {Vector} this
     */
    addToEach(toAdd) {
        this.x += toAdd
        this.y += toAdd
        return this
    }

    /**
     * subtracts the given number from each coordinate of this vector
     * @param {number} toSub 
     * @return {Vector} this
     */
    subFromEach(toSub) {
        this.x -= toSub
        this.y -= toSub
        return this
    }


    /**
     * adds a vector to this vector
     * @param {Vector} vector 
     * @return {Vector} this
     */
    add(vector) {
        this.x += vector.x
        this.y += vector.y
        return this
    }

    /**
     * subtracts a vector from this vector
     * @param {Vector} vector 
     * @return {Vector} this
     */
    sub(vector) {
        this.x -= vector.x
        this.y -= vector.y
        return this
    }

    /**
     * multiply this vector by the given vector
     * @param {Vector} vector 
     * @return {Vector} this
     */
    mul(vector) {
        this.x *= vector.x
        this.y *= vector.y
        return this
    }

    /**
     * divide each coordinate of this vector by the given vector's coordinates
     * @param {Vector} vector 
     * @return {Vector} this
     * @throws {string} nullVectorCoordinateDivision
     */
    div(vector) {

        if(vector.x != 0 && vector.y != 0) {
            this.x /= vector.x
            this.y /= vector.y
            return this
        } 

        throw "nullVectorCoordinateDivision"
    }
}