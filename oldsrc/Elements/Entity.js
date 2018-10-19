import Konva from '../Vendor/MyKonva'
import DeleteButton from './DeleteButton'
import EditableText from './EditableText'
import PropertyAdder from './PropertyAdder'
import HasManyRelationHandle from './HasManyRelationHandle'
import BelongsToRelationHandle from './BelongsToRelationHandle'
import HasOneRelationHandle from './HasOneRelationHandle'
import MathHelper from '../Utils/Math/MathHelper'
import EntityStyle from './Styles/EntityStyle'
import EntitiyView from '../Models/Entity'
//too many imports is it really needed?
// _V is deprecated 
// we must add math function in getnearestpoint
// we must add styles 


class Entity extends Konva.Group {
    /**
     * 
     * @param {EntitiyView} model 
     */
    constructor(model) {
        super({
            draggable:true
        })

        this.x(model.pos.x)
        this.y(model.pos.y)
        /*
         *  Registering components
         */

        this.bg = new Konva.Rect();
        this.deleteButton = new DeleteButton()
        this.text = new EditableText()
        this.propertyAdder = new PropertyAdder()
        this.hasManyRelationHandle = new HasManyRelationHandle()
        this.belongsToRelationHandle = new BelongsToRelationHandle()
        this.hasOneRelationHandle = new HasOneRelationHandle()

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
            this.bg,
            this.deleteButton,
            this.text
        )

        /*
         *  Registering events
         */

        this.text.addEventListener("change", e => {
            model.name = this.text.text()
            this.centering()
        })

        this.propertyAdder.on("click", e => {
            e.cancelBubble = true;
            this.dispatchEvent(new Event("addproperty"))
        })

        this.bg.on("dblclick", e => {
            e.cancelBubble = true;
        })

        this.deleteButton.on("click", e => {
            console.log("Delete entity");
            this.dispatchEvent(new Event('delete'));
        })
        
        
        this.text.editText()
    }

    mounted() {
        EntityStyle.apply(this)
        this.centering()
    }

    centering() {

        let text = this.text,
            bg = this.bg,
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
        bg.width(text.width() + PADDING*2)
        
        //centering the rectangle
        bg.x(-bg.width()/2)
        bg.y(-bg.height()/2)

        //adjust deleteButton
        deleteButton.x(bg.width() /2 - 3)
        deleteButton.y(-bg.height() /2 + 3)

        //adjust propertyAdder
        propertyAdder.y(-bg.height()/2 - 15)
        propertyAdder.direct({x:0,y:0})

        //adjust relationHandle
        hasManyRelationHandle.x(bg.width() /2 - 5)
        hasManyRelationHandle.y(bg.height() /2 - 5)
        belongsToRelationHandle.x(bg.width() /2 - 5)
        belongsToRelationHandle.y(bg.height() /2 - 5)
        hasOneRelationHandle.x(bg.width() /2 - 5)
        hasOneRelationHandle.y(bg.height() /2 - 5)

        //adjust properties

        let layer
        if( layer = this.getLayer())
            layer.draw()
    }

    getNearestPoint(to) {
        let abs = this.getAbsolutePosition(),
            w = this.bg.width(),
            h = this.bg.height()

        return MathHelper.getNearestPointToRectangle(abs,to,w,h)
    }
}

export default Entity