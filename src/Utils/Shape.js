import Konva from '../Vendor/Konva'
class Shape extends Konva.Group {
    constructor(props){
        super()

        if(props.children) {
            for(let i in props.children) {
                this.add(props.children[i])
            }
        }
    }
}
export default Shape