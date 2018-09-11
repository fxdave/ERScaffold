import Shape from '../Utilities/Shape';

class Circle extends Shape {
    radius: number;
    color: string = '#fff'
    constructor(radius: number) {
        super()
        this.radius = radius
        this.redraw()
    }

    redraw() {
        this.graphics.clear().beginFill(this.color).drawCircle(0, 0, this.radius)
    }
}

export default Circle