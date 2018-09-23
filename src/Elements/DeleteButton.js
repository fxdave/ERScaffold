import Konva from '../Vendor/Konva'

//we must create styles

class DeleteButton extends Konva.Group {
    constructor(props) {
        super(props)

        this.width= 100
        this.height=30

        let circle = new Konva.Circle({
            x : 0,
            y :  0,
            radius: 10,
            fill: '#ff006f',
            opacity: 0.8
        });
        
        let text = new Konva.Text({
            x: -4,
            y: -4,
            fontSize:10,
            text : '\u2715',
            fill: '#fff'
        })

        this.add(circle,text)
    }
}

export default DeleteButton