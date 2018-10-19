import RelationHandle from './RelationHandle'
import Konva from '../Vendor/MyKonva'
import MathHelper from '../Utils/Math/MathHelper';

class BelongsToRelationHandle extends RelationHandle {
    constructor(props) {
        super(props)

        this.me = this
        this.type = "belongsTo"

        this.triangle = new Konva.Line({
            fill: '#ff006f',
            closed:true
        });
        this.add(this.triangle)
        this.triangle.setZIndex(0)
        this.directToDefault()

    }

    /**
     * 
     * @param {x,y} from 
     * @param {x,y} to 
     */
    direct(from,to) {
        let proj = MathHelper.triangularProjection(to,from,3)
        this.triangle.points([to.x,to.y,proj[0],proj[1],proj[4],proj[5]])
        
        let layer
        if( layer = this.getLayer())
            layer.draw()
            
        //_V.entityLayer.draw()
        //_V.tempLayer.draw()
    }
}

export default BelongsToRelationHandle