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
        this.input.onkeydown = this._handleKeyDow.bind(this)

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
        T.hitArea = H

        this.addChild(T)

        H.addEventListener('dblclick', this._handleDblClick.bind(this))
        T.addEventListener('dblclick', this._handleDblClick.bind(this))
    }

    /**
     * creates an <input type="text"> to the body
     * and sets its properties
     */
    _createHTMLInputElement() {
        console.log(this.parent)
        const input = this.input = document.createElement('input')

        input.type = 'text'
        input.value = ""
        input.className = "hidden-input"

        document.body.appendChild(input)

        this.addEventListener('removed',this._deleteHTMLInputElement.bind(this))
        return input
    }

    _deleteHTMLInputElement() {
        document.body.removeChild(this.input)
    }

    _handleKeyDow(e: KeyboardEvent) {
        if (e.key == "Enter")
            this.endEdit()
        this.value = this.input.value
        this.text.text = this.value
        const W = this.text.getMeasuredWidth()
        const H = this.text.getMeasuredHeight()
        this.text.x = -W/2
        this.text.y = -H/2
    }

    _handleDblClick(e: MouseEvent) {
        this.startEdit()
    }

    startEdit() {
        this.input.focus()
        this.input.style.display = "block"
    }

    endEdit() {
        this.input.style.display = "none"
    }

    focus() {
        this.input.focus();
    }

}

export default TextBox