import Vector from './Vector';

class Matrix {
    matrix : Array<Array<number>> = null
    constructor(matrix: Array<Array<number>>)
    {
        this.matrix = matrix
    }

    static fromColumns(a:Vector,b:Vector) {
        return new Matrix([[a.x,b.x],[a.y,b.y]])
    }

    static fromRows(a:Vector, b:Vector) {
        return new Matrix([[a.x,a.y],[b.x,b.y]])
    }

    getRow(n:number) {
        return new Vector(this.matrix[n][0], this.matrix[n][1]);
    }

    setRow(n:number,row : Vector) {
        this.matrix[n][0] = row.x,
        this.matrix[n][1] = row.y
    }

    getCol(n:number) {
        return new Vector(this.matrix[0][n],this.matrix[1][n])
    }

    setCol(n:number,col : Vector) {
        this.matrix[0][n] = col.x,
        this.matrix[1][n] = col.y
    }
    
    get row0(){
        return this.getRow(0)
    }

    get row1() {
        return this.getRow(1)
    }

    get col0(){
        return this.getCol(0)
    }

    get col1(){
        return this.getCol(1)
    }

    set row0(row: Vector) {
        this.setRow(0,row)
    }

    set row1(row: Vector) {
        this.setRow(1,row)
    }

    set col0(col: Vector) {
        this.setCol(0,col)
    }

    set col1(col: Vector) {
        this.setCol(1,col)
    }

    get det() {
        const m = this.matrix
        return m[0][0] * m[1][1] - m[0][1] * m[1][0]
    }

    clone() {
        return new Matrix([
            [this.matrix[0][0], this.matrix[0][1]],
            [this.matrix[1][0], this.matrix[1][1]]
        ])
    }
}

export default Matrix