import Konva from '../Vendor/MyKonva'
import EditableText from './EditableText'
import DeleteButton from './DeleteButton'
import PropertyStyle from './Styles/PropertyStyle';
import PropertyModel from '../Models/Property'
import MathHelper from '../Utils/Math/MathHelper'
import Vector from '../Utils/Math/Vector'

class Property extends Konva.Group {
    /**
     * 
     * @param {PropertyModel} model 
     */
    constructor(model) {
        super({
            draggable: true
        })

        this.circle = new Konva.Ellipse();
        this.text = new EditableText()
        this.deleteButton = new DeleteButton()
        this.line = new Konva.Line()

        this.direct({
            x: 0,
            y: 0
        })


        this.deleteButton.on("click", e => {
            console.log("Delete property");
            this.dispatchEvent(new Event('delete'));
        })
        this.deleteButton.opacity(0)

        this.text.addEventListener("change", e => {
            model.text = this.text.text()
            this.update()
        })

        this.addEventListener("arrange", e => {
            model.pos = new Vector(this.x(),this.y())
            this.update()
        })

        this.addEventListener("dragmove", e => {
            model.pos = new Vector(this.x(),this.y())
            this.update()
        })

        this.optimalDistanceSquare = Math.pow(30, 2)
        this.add(this.line, this.circle, this.text, this.deleteButton)
        this.text.editText()
    }

    mounted() {
        PropertyStyle.apply(this)
    }

    update() {
        this.direct({
            x: 0,
            y: 0
        })
    }

    direct(to) {
        this.line.points([0, 0, to.x - this.x(), to.y - this.y()])

        //centering the text
        this.text.x(-this.text.width() / 2)
        this.text.y(-this.text.height() / 2)

        this.circle.radius({
            x: this.text.width() + 10,
            y: 20
        })

        this.deleteButton.x(this.circle.width() / 2 / 1.41)
        this.deleteButton.y(-this.circle.height() / 2 / 1.41)
    }


    getNearestPoint(to) {
        let abs = this.getAbsolutePosition()

        let x = abs.x,
            y = abs.y,
            w = this.circle.radius().x,
            h = this.circle.radius().y

        return MathHelper.getNearestPointToRectangle({x,y},to,w,h)
        
    }


}

export default Property