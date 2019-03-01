import React from 'react'
import { Vec2 } from 'vecjs'
import SmoothLine from '../basic/SmoothLine'

class One extends React.Component {
    render() {
        return (
            <SmoothLine points={this.getPoints()} stroke="black" strokeWidth={2} />
        )
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
      const from = new Vec2(this.props.from)
      const to = new Vec2(this.props.to)
      const trough = new Vec2(this.props.trough)

      const from_trough = trough.sub(from)
      const from_to = to.sub(from)
      const projection = from_trough.proj(from_to)

      let C
      if (projection.err) {
          if (this.props.normal == 1)
              C = from_to.normal1.add(from).map(x => x * 100)
          else C = from_to.normal2.add(from).map(x => x * 100)
      } else {
          const proj_trough = trough.sub(projection.res.add(from))
          C = from.add(proj_trough)
      }

      return [trough.x, trough.y, C.x, C.y, from.x, from.y]
  };
}

export default One
