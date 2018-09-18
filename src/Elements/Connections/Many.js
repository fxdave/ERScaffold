
class __Many extends Konva.Group {
    constructor(props) {
        super(props)

        this.lines = [
            new Konva.Line({
                points: [0,0,0,0],
                stroke: 'black',
                strokeWidth: 2,
                lineCap: 'round',
                lineJoin: 'round'
            }),
            new Konva.Line({
                points: [0,0,0,0],
                stroke: 'black',
                strokeWidth: 2,
                lineCap: 'round',
                lineJoin: 'round'
            }),
            new Konva.Line({
                points: [0,0,0,0],
                stroke: 'black',
                strokeWidth: 2,
                lineCap: 'round',
                lineJoin: 'round'
            })
        ]

        this.add(...this.lines)
    }

    change(from,to) {
        let p = Math.triangularProjection(from,to,6)

        this.changeLine(from,{x:p[0], y: p[1]},this.lines[0])
        this.changeLine(from,{x:p[2], y: p[3]},this.lines[1])
        this.changeLine(from,{x:p[4], y: p[5]},this.lines[2])
        _V.connectionLayer.draw()
    }

    changeLine(from,to,line) {
        let old = line.points()
        
        old[0] = from.x
        old[1] = from.y
        
        old[2] = to.x
        old[3] = to.y

        line.points(old)
    }
    
}

Elements.Connections.Many = __Many