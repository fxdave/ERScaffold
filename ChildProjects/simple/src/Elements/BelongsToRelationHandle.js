class __BelongsToRelationHandle extends Elements.RelationHandle {
    constructor(props) {
        super(props)

        this.me = this
        this.type = "belongsTo"

        this.triangle = new Konva.Line({
            fill: '#ff006f',
            closed:true
        });
        
        this.add(this.triangle)
        this.directToDefault()

    }

    /**
     * 
     * @param {x,y} from 
     * @param {x,y} to 
     */
    direct(from,to) {
        let proj = Math.triangularProjection(to,from,3)
        this.triangle.points([to.x,to.y,proj[0],proj[1],proj[4],proj[5]])
        _V.entityLayer.draw()
        _V.tempLayer.draw()
    }
}

Elements.BelongsToRelationHandle = __BelongsToRelationHandle
