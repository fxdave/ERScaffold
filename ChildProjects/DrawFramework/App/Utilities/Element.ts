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

/*
    set parent(to :any) {
        console.log(this);
        console.log(to);
        
    }
*/
    getAbsolutePos() : Vector {
        if(this.parent) {
            let pos = new Vector(this.parent.x,this.parent.y)
            if(this.parent instanceof Element) {
                pos = this.parent.getAbsolutePos()
            }
            return Vector.add(new Vector(pos.x, pos.y), this.pos)
        } else {
            return new Vector(0,0)
        }
    }

    abstract redraw() : void
}

export default Element