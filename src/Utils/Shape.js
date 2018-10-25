import Konva from '../Vendor/Konva'
class Shape extends Konva.Group {
    constructor(props) {
        super({
            draggable: true
        })
        

        let circle = new Konva.Circle({
            x : 0,
            y :  0,
            radius: 10,
            fill: '#ff006f',
            opacity: 0.8
        });

        this.add(circle)
/*
        if(props.children) {
            for(let i in props.children) {
                this.add(props.children[i])
            }
        }
*/
        
    }
}
export default Shape