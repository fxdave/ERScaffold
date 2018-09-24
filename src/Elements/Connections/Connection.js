import Konva from '../../Vendor/Konva'
import ConnectionEntity from '../ConnectionEntitiy'
// we musnt use connection entitiy here 
// this must be independent
// _V is deprecated 

class Connection extends Konva.Group {
    constructor(props) {
        super(props)

        const from = this.from = props.from
        const to = this.to = props.to

        from.addEventListener("delete", ()=>{
            console.log("Delete connection");
            this.dispatchEvent(new Event('delete'));
        })
        
        to.addEventListener("delete", () => {
            console.log("Delete connection");
            this.dispatchEvent(new Event('delete'));
        })

        this.relationEntity = new ConnectionEntity();


        this.relationEntity.addEventListener("delete",()=>{
            this.dispatchEvent(new Event("delete"))
        })

        //_V.connectionEntityLayer.add(this.relationEntity)
        this.add(this.relationEntity)
        this.relationEntity.setZIndex(2)

        this.from.on("dragmove", e => {
            this.update()
        })

        this.to.on("dragmove", e => {
            this.update()
        })

        this.from.addEventListener("arrange", e => {
            this.update()
        })

        this.to.addEventListener("arrange", e => {
            this.update()
        })
    }

    update() {
        let half = this.getHalfway(this.from,this.to)

        this.fromOne.change(half,{
            x: this.from.x(),
            y: this.from.y()
        })

        this.toOne.change(half, {
                x: this.to.x(),
                y: this.to.y()
        })

        this.relationEntity.x(half.x)
        this.relationEntity.y(half.y)
        //_V.connectionEntityLayer.draw()
    }

    getHalfway(from, to) {
        return {
            x: (from.x() + to.x()) / 2,
            y: (from.y() + to.y()) / 2
        }
    }
}

export default Connection
