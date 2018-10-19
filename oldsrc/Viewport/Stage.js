import Konva from '../Vendor/MyKonva'
import LifeCycleDecorator from '../Utils/Decorators/LifeCycleDecorator'
class Stage extends Konva.Stage {
    constructor(){
        super({
            draggable: true,
            container: 'konva',   // id of container <div>
            width: window.innerWidth,
            height: window.innerHeight
        })

        this.entityLayer = new Konva.Layer()
        this.tempLayer = new Konva.Layer()
        this.connectionLayer = new Konva.Layer()

        this.add(
            this.connectionLayer,
            //this.connectionEntityLayer,
            this.entityLayer,
            this.tempLayer
        )

        this._addEvents()
    }

    /**
     * Stage will resize itself on window resize
     */
    _addEvents(){
        window.addEventListener("resize", () => {
            this.width(window.innerWidth)
            this.height(window.innerHeight)
        });


        document.querySelectorAll("canvas").forEach(v => {
            v.onmousedown = e => {
                return false;
            }
        })
    }
}

export default Stage