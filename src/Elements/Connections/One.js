import Konva from '../../Vendor/Konva'

// _V is depreacted
class One extends Konva.Line {
    constructor(props) {
        super({
            points: [0,0,0,0],
            stroke: 'black',
            strokeWidth: 2,
            lineCap: 'round',
            lineJoin: 'round',
            tension : 1
        })
    }

    change(from,to) {
        let old = this.points()
        
        old[0] = from.x
        old[1] = from.y
        
        old[2] = to.x
        old[3] = to.y

        this.points(old)
        let layer = this.getLayer()
        if(layer)
            layer.draw()
    }
    
}

export default One