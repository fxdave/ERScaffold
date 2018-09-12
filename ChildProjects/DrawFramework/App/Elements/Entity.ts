import Element from '../Utilities/Element';
import Vector from '../Utilities/LinearAlgebra/Vector';
import Circle from '../Shapes/Circle';
import RoundRectangle from '../Shapes/RoundRectangle';
import TextBox from './TextBox';
import DeleteButton from './DeleteButton';

enum State {
    Growing = 1,
    Shrinking,
    Deleted,
    Created,
}

class Entity extends Element {

    state: State = State.Growing;

    constructor() {
        super()
        //create look
        this.redraw()

    }

    _grow(el: Circle) {
        this.state = State.Growing
        el.tween
            .to({ radius: 5 }, 300, createjs.Ease.linear)
            .call(() => this._startShrink(el))
            .on("change", function () {
                el.redraw()
            }, el)
    }

    _shrink(el: Circle) {
        this.state = State.Shrinking
        el.tween
            .to({ radius: 0 }, 100, createjs.Ease.linear)
            .call(this.selfDelete)
            .on("change", function () {
                el.redraw()
            }, el)
    }

    _startShrink(el: Circle) {
        if (this.state == State.Growing) {
            this._shrink(el)
        } else {
            this._constructEntity()
        }
    }


    textBox: TextBox
    bg: RoundRectangle
    //propertyAdder: PropertyAdder
    deleteButton: DeleteButton

    _constructEntity() {
        
        // growing by type
        this.textBox = new TextBox(200,50)

        // growing with the textBox
        this.bg = new RoundRectangle(20, 200, 50)

        // fixed from topLeft
        //this.propertyAdder = new PropertyAdder()
        // fixed from topRight
        this.deleteButton = new DeleteButton()

        // handle growing bg on type to textBox
        this.textBox.onChange =  (changed: TextBox) => {
            this.bg.w = changed.w
            this.bg.redraw()
            //this.propertyAdder.pos = Vector.add(e.topLeft, new Vector(-10, -10))
            //this.propertyAdder.connectedTo = e.topLeft
            this.deleteButton.pos = changed.topLeft
            this.deleteButton.redraw()
        }
        this.textBox.startEdit()

        this.addChild(this.bg,this.textBox,this.deleteButton)
        console.log(this.textBox.parent)
    }

    redraw() {
        const bg = new Circle(0);
        this._grow(bg);
        this.addChild(bg)
        bg.addEventListener("click", this._handleSelfCreate.bind(this))
    }

    _handleSelfCreate() {
        this.state = State.Created
    }
}

export default Entity