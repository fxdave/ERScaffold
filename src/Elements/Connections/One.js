import Konva from '../../Vendor/MyKonva'
import Vector from '../../Utils/Math/Vector'
import MathHelper from '../../Utils/Math/MathHelper';
// _V is depreacted
class One extends Konva.Group {
    constructor(props) {
        super()

        this.points = [0,0,0,0,0,0]
        this.line = new Konva.Shape({
            sceneFunc: (ctx, shape) => {
                ctx.beginPath();
                ctx.moveTo(this.points[0], this.points[1]);
                ctx.quadraticCurveTo(
                    this.points[2], 
                    this.points[3], 

                    this.points[4], 
                    this.points[5], 
                );
        
                // (!) Konva specific method, it is very important
                ctx.fillStrokeShape(shape);
            },
            stroke: 'black',
            strokeWidth: 2
        })

        this.add(this.line)
    }

    change(half,from,to, normalID) {
        from = Vector.fromObject(from)
        to = Vector.fromObject(to)
        half = Vector.fromObject(half)
        
        let C = MathHelper.getSmoothPoint(from,half,to)

        if(Vector.getDistanceSquare(from,to) < 300) {
            let from_half_vector = Vector.sub(half,from)
            let N = Vector.getNormal(from_half_vector, normalID)
            C = Vector.add(from,half)
            C.divEachBy(2)

            try{
                N.normalize()
                N.mulEachBy(100)

                C.add(N)
            } catch(e) {
                // dont care
            }
        }

        this.points = [half.x,half.y,C.x,C.y,from.x,from.y]
        let layer = this.getLayer()
        if(layer)
            layer.draw()
    }
    
}

export default One