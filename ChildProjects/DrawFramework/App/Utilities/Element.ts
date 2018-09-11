//import createjs from 'createjs'
import Vector from './LinearAlgebra/Vector';
import DeleteEvent from './Events/DeleteEvent';

abstract class Element extends createjs.Container {
    constructor() {
        super()
    }

    selfDelete() {
        let event = new CustomEvent('onDeleteElement', { detail: this });
        this.dispatchEvent(event);
    }

    get pos(){
        return new Vector(this.x,this.y)
    }

    set pos(pos: Vector){
        this.x = pos.x
        this.y = pos.y
    }

    abstract redraw() : void
}

export default Element