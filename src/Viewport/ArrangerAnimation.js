import Konva from '../Vendor/MyKonva'

class ArrangerAnimation {
    constructor(layers, arranger){

        this.anim = new Konva.Animation(frame => {
            arranger.tick()
        })

        layers.forEach(element => {
            this.anim.addLayer(element)
        });

    }

    start() {
        this.anim.start()
    }
}

export default ArrangerAnimation