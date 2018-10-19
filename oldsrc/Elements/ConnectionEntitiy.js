import Konva from '../Vendor/MyKonva'
import EditableText from './EditableText'
import DeleteButton from './DeleteButton'
import PropertyAdder from './PropertyAdder'
import Property from './Property'
import MathHelper from '../Utils/Math/MathHelper';


// _V is deprecated
// must use styles
// must make an abstraction for entity like elements


class ConnectionEntity extends Konva.Group {
    constructor(props) {
        super({
            ...props,
            draggable : true
        })
        
        this.bg = new Konva.RegularPolygon({
            sides: 4,
            radius: 10,
            stroke: 'black',
            strokeWidth: 1,
            fill:'#fff'
          });

        this.text = new EditableText()
        this.deleteButton = new DeleteButton()
        this.properties = []
        this.propertyAdder = new PropertyAdder()
        this.add(this.bg,this.text, this.deleteButton,this.propertyAdder)
        
        
        this.bg.setZIndex(1)
        this.propertyAdder.setZIndex(0)
        this.text.setZIndex(2)


        this.propertyAdder.on("click", e => {
            e.cancelBubble = true;
            this.dispatchEvent(new Event("addproperty"))
        })

        this.bg.on("dblclick",e => {
            e.cancelBubble = true;
            this.text.editText()
            this.centering()
        })

        this.deleteButton.on("click", e=> {
            e.cancelBubble = true;
            this.dispatchEvent(new Event("delete"))
        })

        this.deleteButton.opacity(0)
        this.on("mouseover",e => {
            this.deleteButton.opacity(1)
        })

        this.on("dragmove",e => {
            this.getParent().update()
        })

        this.addEventListener("arrange",e => {
            this.getParent().update()
        })

        this.on("mouseleave",e => {
            this.deleteButton.opacity(0)
        })

        this.optimalDistanceSquare = Math.pow(30,2)

        this.centering()
    }


    addProperty() {
        console.log("Add Property")

        const P = new Property()
        
        //requesting name
        P.text.editText()
        //add to arranger
        //_V.arranger.add(P)
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
            //_V.arranger.remove(P)
            P.remove()
        })

    }

    centering() {
        this.text.x(-this.text.width()/2)
        this.text.y(-this.text.height()/2)

        if(this.text.width() == 0) {
            this.propertyAdder.opacity(0)
            this.bg.radius(10)
            this.deleteButton.y(-this.bg.radius()*2)
            this.deleteButton.x(this.propertyAdder.circle.width())
            this.propertyAdder.y(-this.bg.radius()*2-5)
        } else {

            this.propertyAdder.opacity(1)
            this.bg.radius(this.text.width()/2 + 10)
            this.deleteButton.x(this.bg.radius()/1.14)
            this.propertyAdder.y(-this.bg.radius()-15)
            this.propertyAdder.direct({x:0,y:0})
            this.deleteButton.y(0)
        }
        
        let layer = this.getLayer()
        if(layer) {
            layer.draw()
        }
    }
    
    getNearestPoint(to) {
        let abs = this.getAbsolutePosition()

        let near =  MathHelper.getNearestPointToCircle(abs,to,this.bg.radius())
        
        return near
    }
   
}

export default ConnectionEntity