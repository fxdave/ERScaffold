import Konva from '../Vendor/Konva'
import DeleteButton from './DeleteButton'
import EditableText from './EditableText'
import PropertyAdder from './PropertyAdder'
import HasManyRelationHandle from './HasManyRelationHandle'
import BelongsToRelationHandle from './BelongsToRelationHandle'
import HasOneRelationHandle from './HasOneRelationHandle'


//too many imports is it really needed?
// _V is deprecated 
// we must add math function in getnearestpoint
// we must add styles 


class Entity extends Konva.Group {
    constructor(props) {
        super({
            ...props,
            draggable:true
        })

        this.width= 100
        this.height=60

        /*
         *  Registering components
         */

        this.rect = new Konva.Rect({
            x : - this.width / 2,
            y :  - this.height / 2,
            width : this.width,
            height: this.height,
            cornerRadius: 10,
            fill: '#2f2f2f'
        });

        this.deleteButton = new DeleteButton({
            x:this.width /2 - 3,
            y:-this.height /2 + 3
        })

        this.text = new EditableText({
            fontSize:22,
            text : 'Entity',
            fill: '#fff',
            fontFamily: 'Open Sans'
        })

        this.properties = []
        this.propertyAdder = new PropertyAdder({
            opacity: 0.5
        })

        this.hasManyRelationHandle = new HasManyRelationHandle({
            rotation : 22.5
        })

        this.belongsToRelationHandle = new BelongsToRelationHandle({
            rotation : 45
        })

        this.hasOneRelationHandle = new HasOneRelationHandle({
            rotation : 67.5
        })

        this.hasManyRelationHandle.addEventListener("connect",e => {
            this.dispatchEvent(e)
        })

        this.belongsToRelationHandle.addEventListener("connect",e => {
            this.dispatchEvent(e)
        })

        this.hasOneRelationHandle.addEventListener("connect",e => {
            this.dispatchEvent(e)
        })

        this.add(
            this.propertyAdder,
            this.hasManyRelationHandle,
            this.hasOneRelationHandle,
            this.belongsToRelationHandle,
            this.rect,
            this.deleteButton,
            this.text
        )
        this.propertyAdder.setZIndex(0)
        this.text.setZIndex(2)
        this.deleteButton.setZIndex(2)
        this.rect.setZIndex(1)
        this.belongsToRelationHandle.setZIndex(0)
        this.hasManyRelationHandle.setZIndex(0)
        this.hasOneRelationHandle.setZIndex(0)

        /*
         *  Registering events
         */

        this.text.addEventListener("change", e => {
            this.centering()
        })

        this.propertyAdder.on("click", e => {
            e.cancelBubble = true;
            this.dispatchEvent(new Event("addproperty"))
        })

        this.rect.on("dblclick", e => {
            e.cancelBubble = true;
        })

        this.deleteButton.on("click", e => {
            console.log("Delete entity");
            this.dispatchEvent(new Event('delete'));
        })
        this.deleteButton.opacity(0)

        this.addEventListener("mouseover",e=>{
            this.deleteButton.opacity(1)
        })
        this.addEventListener("mouseleave",e=>{
            this.deleteButton.opacity(0)
        })
        this.propertyAdder.addEventListener("mouseover",e=>{
            this.propertyAdder.opacity(1)
        })
        this.propertyAdder.addEventListener("mouseleave",e=>{
            this.propertyAdder.opacity(0.5)
        })

        /*
         * adjust and start editing 
         */
        this.centering()
        this.text.editText()
        
    }

    centering() {

        let text = this.text,
            rect = this.rect,
            deleteButton = this.deleteButton,
            hasManyRelationHandle = this.hasManyRelationHandle,
            hasOneRelationHandle = this.hasOneRelationHandle,
            belongsToRelationHandle = this.belongsToRelationHandle,
            propertyAdder = this.propertyAdder

        const PADDING = 20

        //centering the text
        text.x(-text.width()/2)
        text.y(-text.height()/2)

        //adjust rectangle
        rect.width(text.width() + PADDING*2)
        
        //centering the rectangle
        rect.x(-rect.width()/2)
        rect.y(-rect.height()/2)

        //adjust deleteButton
        deleteButton.x(rect.width() /2 - 3)
        deleteButton.y(-rect.height() /2 + 3)

        //adjust propertyAdder
        propertyAdder.y(-rect.height()/2 - 15)
        propertyAdder.direct({x:0,y:0})

        //adjust relationHandle
        hasManyRelationHandle.x(rect.width() /2 - 5)
        hasManyRelationHandle.y(rect.height() /2 - 5)
        belongsToRelationHandle.x(rect.width() /2 - 5)
        belongsToRelationHandle.y(rect.height() /2 - 5)
        hasOneRelationHandle.x(rect.width() /2 - 5)
        hasOneRelationHandle.y(rect.height() /2 - 5)

        //adjust properties

        let layer
        if( layer = this.getLayer())
            layer.draw()
    }

    getNearestPoint(to) {
        let abs = this.getAbsolutePosition()
        let x = abs.x,
            y = abs.y,
            w = this.rect.width(),
            h = this.rect.height()

        let LTC = {
            x,y
        }

        let RBC = {
            x: x+ w,
            y: y+ h
        }

        let x_out,y_out

        let centerX = false
        let centerY = false

        if(to.x <= LTC.x) {
            x_out = LTC.x
        } else if(to.x > LTC.x && to.x < RBC.x) {
            x_out = to.x
            centerX = true
        } else if (to.x >= RBC.x) {
            x_out = RBC.x
        }

        if(to.y <= LTC.y) {
            y_out = LTC.y
        } else if(to.y > LTC.y && to.y < RBC.y) {
            y_out = to.y
            centerY = true
        } else if (to.y >= RBC.y) {
            y_out = RBC.y
        }

/*
        if(centerX && centerY) {
            x_out = x+w/2
            y_out = y+h/2
        }
*/
        return {
            x: x_out,
            y: y_out
        }
    }
}

export default Entity