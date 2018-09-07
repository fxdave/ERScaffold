import Element from './Element'
//import createjs from 'createjs'

class Viewport extends Element {
    static bgColor : string = "#3b3b3b"
    onDrag(evt : any){
        this.x = evt.stageX;
        this.y = evt.stageY;
    }

    drawGraphics() {
        const bg = new createjs.Shape()
        bg.graphics.beginFill(Viewport.bgColor).rect(-500,-500,1000,1000)
        super.addChild(bg)

        bg.addEventListener("pressmove",this.onDrag.bind(this))
        bg.addEventListener("pressup",this.onDrag.bind(this))
    }
}

export default Viewport