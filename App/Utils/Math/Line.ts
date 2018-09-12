import Vector from './Vector';
import Point from './Point';
import Matrix from './Matrix';

class Line {

    normal : Vector
    point : Point

    constructor(normal: Vector, point: Point) {
        this.normal = normal
        this.point = point
    }

    static solution(a: Line, b: Line) {
        let V1 = Vector.dot(a.normal,a.point)
        let V2 = Vector.dot(b.normal,b.point)
        let V = new Vector(V1,V2)

        let M = Matrix.fromRows(a.normal,b.normal)
        let Mx = M.clone()
        Mx.col0 = V
        
        let My = M.clone()
        My.col1 = V

        let Mdet = M.det
        return new Vector(Mx.det / Mdet, My.det / Mdet)
    }
}