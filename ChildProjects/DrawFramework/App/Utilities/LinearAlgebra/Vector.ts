
class Vector {
    x: number
    y: number

    constructor(x : number,y : number) {
        this.x = x
        this.y = y
    }

    get length() {
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))
    }

    static add(a: Vector, b: Vector) {
        return new Vector(a.x+b.x,a.y+b.y)
    }

    static sub(a: Vector, b: Vector) {
        return new Vector(a.x-b.x, a.y-b.y)
    }

    static mul(a: Vector, b: Vector) {
        return new Vector(a.x*b.x,a.y*b.y)
    }

    static mulEach(a: Vector, b: number) {
        return new Vector(a.x*b,a.y*b)
    }

    static div(a: Vector, b: number) {
        return Vector.mulEach(a,1/b)
    } 

    static normal(a: Vector) {
        return new Vector(a.y,-a.x)
    }

    static distanceSquare(a: Vector, b: Vector) {
        return Math.pow(b.x-a.x,2) + Math.pow(b.y-a.y,2)
    }

    static distance(a: Vector, b:Vector) {
        return Math.sqrt(Vector.distanceSquare(a,b))
    }

    static dot(a: Vector, b:Vector) {
        return a.x*b.x + a.y*b.y
    }

    get normal() {
        return Vector.normal(this)
    }

    
}

export default Vector