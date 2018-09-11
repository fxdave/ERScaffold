import Element from '../Utilities/Element';
import Vector from '../Utilities/LinearAlgebra/Vector';
import Label from '../Shapes/Label';
import Rectangle from '../Shapes/Rectangle';
/**
 * Created by David Judge
 */
class TextBox extends Element {
    w: number
    h: number

    padding: number = 3

    input: HTMLInputElement
    value: string = ""

    text: createjs.Text
    hit: createjs.Shape

    onChange: (changed: TextBox) => void;
    topLeft: Vector;
    topRight: Vector;
    bottomLeft: Vector;
    bottomRight: Vector;
    color: string;
    font: string;

    constructor(w: number, h: number, font:string = '18px Arial', color:string = '#000') {
        //init
        super()

        //set font style
        this.font = font;
        this.color = color;

        //set size
        this.w = w
        this.h = h

        //create an input element
        this.input = this._createHTMLInputElement()
        this.input.onkeyup = this._handleKeyUp.bind(this)

        //draw the textbox
        this.redraw()
    }

    /**
     * updates the whole textbox
     * call this when you modified the properties
     */
    redraw() {

        //label
        const T = this.text = new Label("", this.font, this.color)
        //hit area for label
        const H = this.hit = new Rectangle(this.w, this.h)

        T.y = this.padding
        T.x = this.padding
        T.alpha = 0
        T.hitArea = H

        this.addChild(T)

        H.addEventListener('dblclick', this._handleDblClick.bind(this))
        T.addEventListener('dblclick', this._handleDblClick.bind(this))

        this._updateHTMLElement()
    }

    /**
     * creates an <input type="text"> to the body
     * and sets its properties
     * TODO: get absolute position with respect on the parents 
     */
    _createHTMLInputElement() {
        console.log(this.parent)
        const input = this.input = document.createElement('input')

        input.type = 'text'
        input.value = ""

        //styling the input
        input.style.transform = 'translate(-50%, -50%)'
        input.style.position = 'fixed'
        input.style.zIndex = "100"
        input.style.background = 'none'
        input.style.border = 'none'
        this._updateHTMLElement()

        document.body.appendChild(input)
        return input
    }

    _deleteHTMLInputElement() {
        document.body.removeChild(this.input)
    }

    _updateHTMLElement() {
        console.log("class szerint:");
        console.log(this.parent);
        if(this.parent) {
            console.log(this.getAbsolutePos())
            console.log(this.parent.x);
            console.log(this.parent.parent.x);
        }
        
        const s = this.input.style
        s.width = this.w - 2 * this.padding + 'px'
        s.height = this.h - 2 * this.padding + 'px'
        s.left = this.getAbsolutePos().x + 'px'
        s.top = this.getAbsolutePos().y + 'px'
        s.color = this.color
        s.font = this.font
        s.padding = this.padding + 'px'
    }

    _handleKeyUp(e: KeyboardEvent) {
        if (e.key == "Enter")
            this.endEdit()
        this.value = this.input.value
        this.text.text = this.value
    }

    _handleDblClick(e: MouseEvent) {
        this.startEdit()
    }

    startEdit() {
        this.input.style.display = "block"
        this.text.alpha = 0
    }

    endEdit() {
        this.input.style.display = "none"
        this.text.alpha = 1
    }

    focus() {
        this.input.focus();
    }

}

export default TextBox