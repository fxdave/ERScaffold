//import createjs from 'createjs'

class Element extends createjs.Container {
    constructor() {
        super()
        this.drawGraphics()
    }


    drawGraphics() {}

    selfDelete() {
        //let event = new CustomEvent('onDeleteElement', { element: this });
        //this.dispatchEvent(event);
    }
}

export default Element