import Konva from '../Vendor/MyKonva'

class PropertyAdder extends Konva.Group {
    constructor(props) {
        super(props)


        this.circle = new Konva.Circle({
            radius: 10,
            fill: '#0080ff'
        });
        
        this.text = new Konva.Text({
            x: -3,
            y: -6,
            fontSize:12,
            text : '+',
            fill: '#fff'
        })

        this.line = new Konva.Line({
            points: [0,0,0,0],
            stroke: 'black',
            strokeWidth: 1,
        })

        this.direct({
            x:0,
            y:0
        })

        this.add(this.line,this.circle,this.text)
    }

    direct(to){
        this.line.points([0,0,to.x - this.x(),to.y-this.y()])
    }
}

export default PropertyAdder