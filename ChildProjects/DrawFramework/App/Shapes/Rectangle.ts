import Shape from '../Utilities/Shape';

class Rectangle extends Shape {
    w: number;
    h: number;
    color: string
    constructor(w:number, h:number, color: string = '#fff') {
        super()
        this.w = w
        this.h = h
        this.color = color
        this.redraw()
    }

    redraw() {
        this.graphics.beginFill(this.color).rect(-this.w/2,-this.h/2,this.w, this.h)
    }
}

export default Rectangle