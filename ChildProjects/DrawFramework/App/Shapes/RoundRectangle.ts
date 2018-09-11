import Shape from '../Utilities/Shape';

class RoundRectangle extends Shape {
    radius: number;
    color: string;
    w: number
    h: number
    constructor(radius: number, w: number, h: number) {
        super()
        this.radius = radius
        this.color = '#fff'
        this.w = w
        this.h = h
        this.redraw()
    }

    redraw() {
        this.graphics.clear().beginFill(this.color).drawRoundRect(- this.w / 2, - this.h / 2, this.w, this.h, this.radius)
    }
}

export default RoundRectangle