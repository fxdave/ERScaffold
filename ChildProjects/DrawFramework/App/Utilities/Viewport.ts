import Element from './Element'
import Vector from './LinearAlgebra/Vector';
import DeleteEvent from './Events/DeleteEvent';
import Entity from '../Elements/Entity';
import MouseEventHelper from './Events/MouseEventHelper';
class Viewport extends Element {
    static bgColor: string = "#0b0b0b";
    static borderColor: string = "#1b1b1b";
    viewportSize: Vector = new Vector(1200, 633)
    elements: Array<Element> = [];

    /**
     * ads element to the viewport
     * @param el the element
     */
    addElement(el: Element) {
        this.elements.push(el)
        el.addEventListener('onDeleteElement', this._onDeleteElement.bind(this))
        this.addChild(el)
    }

    /**
     * event handler for deleting element from the viewport
     * @param e 
     */
    _onDeleteElement(e: any) {
        this.elements = this.elements.filter( el => el != e.detail )
        this.removeChild(e.detail);
    }

    constructor() {
        super()
        this.redraw()
    }

    /**
     * constructs the graphics
     */
    redraw() {
        const bg = new createjs.Shape()
        bg.name = "viewportBG"
        bg.graphics
            .setStrokeStyle(1)
            .beginStroke(Viewport.borderColor)
            .beginFill(Viewport.bgColor)
            .rect(-(this.viewportSize.x / 2), -(this.viewportSize.y / 2), this.viewportSize.x, this.viewportSize.y)
        super.addChild(bg)

        this.x = window.innerWidth / 2
        this.y = window.innerHeight / 2

        // move viewport
        bg.addEventListener("pressmove", this._handleMove.bind(this))
        bg.addEventListener("pressup", this._handleResetMove.bind(this))

        // add entity 
        bg.addEventListener("click", this._handleAddEntity.bind(this))

        // zoom
        window.document.addEventListener("keyup", this._handleZoom.bind(this))
    }

    mouseEventHelper = new MouseEventHelper()

    /**
     * event handler for movement
     * @param e 
     */
    _handleMove(e: any) {
        let stage = new Vector(e.stageX, e.stageY)
        this.pos = this.mouseEventHelper.getMovedCenter(stage, this.pos)
    }

    /**
     * event handler for reset movement
     */
    _handleResetMove() {
        this.mouseEventHelper.resetMovement()
    }

    /**
     * event handler for handling zoom
     * @param e 
     */
    _handleZoom(e: KeyboardEvent) {
        if (e.key == "+") {
            createjs.Tween.get(this)
                .to({ scaleX: this.scaleX + 0.1, scaleY: this.scaleY + 0.1 }, 300);
        }
        if (e.key == "-") {
            createjs.Tween.get(this)
                .to({ scaleX: this.scaleX - 0.1, scaleY: this.scaleY - 0.1 }, 300);
        }
    }

    /**
     * event handler for adding entities
     * @param e 
     */
    _handleAddEntity(e: any) {
        if (e.target.name == "viewportBG") {
            let entity = new Entity()

            let stage = new Vector(e.stageX, e.stageY)
            entity.pos = this.mouseEventHelper.getRelativePosition(this.pos, stage)
            this.addElement(entity)
        }
    }
}

export default Viewport