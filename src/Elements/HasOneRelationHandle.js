import RelationHandle from './RelationHandle'
import Konva from '../Vendor/Konva'

// _V is deprecated

class HasOneRelationHandle extends RelationHandle {
    constructor(props) {
        super(props)

        this.me = this
        this.type = "hasOne"

        this.line = new Konva.Line({
            stroke: '#ff006f',
            strokeWidth: 3,
        });
        
        this.add(this.line)
        this.directToDefault()

    }

    /**
     * 
     * @param {x,y} from 
     * @param {x,y} to 
     */
    direct(from,to) {
        this.line.points([from.x,from.y,to.x,to.y])
        
        let layer
        if( layer = this.getLayer())
            layer.draw()
        //_V.entityLayer.draw()
        //_V.tempLayer.draw()
    }
}

export default HasOneRelationHandle