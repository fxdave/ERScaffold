import Element from '../Utilities/Element';
import Label from '../Shapes/Label';
import Circle from '../Shapes/Circle'

class DeleteButton extends Element {
    text: Label;
    circle: any;
    constructor() {
        super()
        this.redraw()
    }

    redraw() {
        this.circle = new Circle(10)
        this.text = new Label("×")
    }
}

export default DeleteButton