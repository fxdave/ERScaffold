class __HasManyRelationHandle extends Elements.RelationHandle {
    constructor(props) {
        super(props)

        this.me = this
        this.type = "hasMany"
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
        let proj = Math.triangularProjection(from,to,3)
        this.triangle.points([from.x,from.y,proj[0],proj[1],proj[4],proj[5]])
        _V.entityLayer.draw()
        _V.tempLayer.draw()
    }
}

Elements.HasManyRelationHandle = __HasManyRelationHandle
