

class __Entity extends Konva.Group {
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

        this.deleteButton = new Elements.DeleteButton({
            x:this.width /2 - 3,
            y:-this.height /2 + 3
        })

        this.text = new Elements.EditableText({
            fontSize:22,
            text : 'Entity',
            fill: '#fff',
            fontFamily: 'Open Sans'
        })

        this.properties = []
        this.propertyAdder = new Elements.PropertyAdder({
            opacity: 0.8
        })

        this.hasManyRelationHandle = new Elements.HasManyRelationHandle({
            rotation : 22.5
        })

        this.belongsToRelationHandle = new Elements.BelongsToRelationHandle({
            rotation : 45
        })

        this.hasOneRelationHandle = new Elements.HasOneRelationHandle({
            rotation : 67.5
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
            this.addProperty()
        })

        this.rect.on("dblclick", e => {
            e.cancelBubble = true;
        })

        this.deleteButton.on("click", e => {
            console.log("Delete entity");
            this.dispatchEvent(new Event('delete'));
        })
        this.deleteButton.opacity(0.8)

        this.deleteButton.addEventListener("mouseover",e=>{
            this.deleteButton.opacity(1)
        })
        this.deleteButton.addEventListener("mouseleave",e=>{
            this.deleteButton.opacity(0.8)
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

    addProperty() {
        console.log("Add Property")

        const P = new Elements.Property()
        
        //requesting name
        P.text.editText()
        //add to arranger
        _V.arranger.add(P)
        //add to this group
        this.add(P)
        //set z-index
        P.setZIndex(0)
        //store property
        this.properties.push(P)
        //align
        this.centering()

        P.addEventListener("delete", (e)=> {
            this.properties = this.properties.filter(v => {
                return v != P
            })
            _V.arranger.remove(P)
            P.remove()
        })

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


        _V.entityLayer.draw()
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

Elements.Entity = __Entity