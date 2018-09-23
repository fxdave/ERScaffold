import Konva from '../Vendor/Konva'

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
        this.connectionEntityLayer = new Konva.Layer()

        this.add(
            this.entityLayer,
            this.tempLayer,
            this.connectionLayer,
            this.connectionEntityLayer
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
    }
}

export default Stage