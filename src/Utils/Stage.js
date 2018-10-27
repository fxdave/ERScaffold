import Konva from '../Vendor/Konva'

class Stage extends Konva.Stage {
    constructor(){
        super({
            draggable: true,
            container: 'konva',   // id of container <div>
            width: window.innerWidth,
            height: window.innerHeight
        })

        document.querySelectorAll("canvas").forEach(v => {
            v.onmousedown = e => {
                return false;
            }
        })
    }


    subtractDragX(v){
        return v - this.x()
    }

    subtractDragY(v){
        return v - this.y()
    }
}

export default Stage