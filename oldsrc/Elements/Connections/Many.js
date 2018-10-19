import Konva from '../../Vendor/MyKonva'
import MathHelper from '../../Utils/Math/MathHelper'
import One from './One';
// _V is deprecated
class Many extends Konva.Group {
    constructor(props) {
        super(props)

        this.lines = [
            new One(),
            new One(),
            new One()
        ]

        this.add(...this.lines)
    }

    change(from,half, to, normalID) {

        let p = MathHelper.triangularProjection(from,half,6)

        this.lines[0].change(from,{x:p[0], y: p[1]},to,normalID)
        this.lines[1].change(from,{x:p[2], y: p[3]},to,normalID)
        this.lines[2].change(from,{x:p[4], y: p[5]},to,normalID)
    }

    
}

export default Many