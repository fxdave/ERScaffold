import Konva from '../Vendor/Konva'
import Entity from './Entity'
import viewport from '../Viewport/ViewportInstance'
//we need to separate the dropable implementation to a different file
//_V is deprecated

class RelationHandle extends Konva.Group {
    constructor(props) {
        super({
            ...props,
            draggable:true,
            dragBoundFunc :(pos) => {
                return {
                    x: this.getAbsolutePosition().x,
                    y: this.getAbsolutePosition().y
                }
            },
            opacity: 0.5
        })

        this.me = null
       

        this.on("dragstart", (e)=>{
            this.oldState = {
                rotation: this.rotation(),
                pos : {
                    x : this.x(),
                    y : this.y() 
                },
                parent: this.parent
            }
            this.rotation(0)
            let pos = this.getAbsolutePosition()
            this.moveTo(_V.tempLayer)
            this.x(pos.x - _V.stage.x())
            this.y(pos.y - _V.stage.y())
        })

        this.on("dragmove", (e)=>{
            e.cancelBubble = true;
            this.me.direct({
                x: 0, y: 0
            },{
                x: e.evt.clientX - this.getAbsolutePosition().x, 
                y: e.evt.clientY - this.getAbsolutePosition().y
            })
        })

        this.on("dragend", (e)=>{
            this.rotation(this.oldState.rotation)
            
            this.x(this.oldState.pos.x)
            this.y(this.oldState.pos.y)

            this.moveTo(this.oldState.parent)
            this.directToDefault()
    
            var pos = viewport.stage.getPointerPosition();
            var shape = viewport.entityLayer.getIntersection(pos);
            
            let to = shape.parent
            if(!(to instanceof Entity))
                to = to.parent
            if(!(to instanceof Entity))
                to = to.parent
            if(!(to instanceof Entity))
                to = to.parent

            viewport.addConnection(this.parent,to,this.me.type)
            
        })
        
        this.on("mouseover",e => {
            this.opacity(1)
        })
        this.on("mouseleave",e => {
            this.opacity(0.5)
        })

    }


    directToDefault() {
        this.me.direct({
            x: 0, y: 0
        },{
            x: 20, y: 0
        })
    }
}

export default RelationHandle
