import Konva from '../Vendor/Konva'

class Stage extends Konva.Stage {
    constructor(){
        super({
            draggable: true,
            container: 'konva',   // id of container <div>
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
}

export default Stage