import React from 'react'
import ConnectorHandle from './ConnectorHandle'
import MathHelper from '../../math/MathHelper'

class HasManyConnectorHandle extends ConnectorHandle {
    connectionType = "hasMany"

    points = (from, to) => {
        let proj = MathHelper.triangularProjection(from, to, 5);
        let proj2 = MathHelper.triangularProjection(to, from, 1);
        return [
            proj2[0],
            proj2[1],
            proj2[4],
            proj2[5],
            proj[0],
            proj[1],
            proj[4],
            proj[5]
        ];
    }

    styles() {
        return {
            fill: "#ff006f",
            closed: true
        }
    }
}

export default HasManyConnectorHandle