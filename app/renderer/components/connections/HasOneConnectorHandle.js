import React from 'react'
import ConnectorHandle from './ConnectorHandle'
import MathHelper from '../../math/MathHelper'

class HasManyConnectorHandle extends ConnectorHandle {
    connectionType = "hasOne"

    points = (from, to) => {
        return [from.x, from.y, to.x, to.y];
    }

    styles() {
        return {
            stroke: '#ff006f',
            strokeWidth: 4,
        }
    }
}

export default HasManyConnectorHandle