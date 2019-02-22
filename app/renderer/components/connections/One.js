import React from 'react'
import SmoothLine from '../basic/SmoothLine'
import { Vec2 } from 'vecjs'
class One extends React.Component {

    render() {
        return <SmoothLine points={this.getPoints()} stroke="black" strokeWidth={2} />
    }

    /**
     *
     * @param {Object} from
     * @param {number} from.x
     * @param {number} from.y
     * @param {Object} to
     * @param {number} to.x
     * @param {number} to.y
     */
    getPoints = () => {

        let from = new Vec2(this.props.from);
        let to = new Vec2(this.props.to);
        let trough = new Vec2(this.props.trough);

        let from_trough = (trough).sub(from)
        let from_to = (to).sub(from)
        let projection = (from_trough).proj(from_to)

        let C
        if (projection.err) {
            if (this.props.normal == 1)
                C = from_to.normal1.add(from).map(x => x * 100)
            else
                C = from_to.normal2.add(from).map(x => x * 100)
        } else {
            let proj_trough = (trough) .sub ( (projection.res) .add (from) )
            C = (from).add(proj_trough)

        }

        return [trough.x, trough.y, C.x, C.y, from.x, from.y]
    }
}

export default One