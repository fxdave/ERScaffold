import React from 'react';
import ConnectorHandle from './ConnectorHandle';
import MathHelper from '../../math/MathHelper';

class HasManyConnectorHandle extends ConnectorHandle {
  connectionType = 'belongsToMany';

  points = (from, to) => {
    const proj = MathHelper.triangularProjection(from, to, 5);
    const proj2 = MathHelper.triangularProjection(to, from, 5);
    const avg = {
      x: (from.x + to.x) / 2,
      y: (from.y + to.y) / 2
    };
    const proj3 = MathHelper.triangularProjection(to, avg, 2);
    return [
      proj2[0],
      proj2[1],

      proj2[4],
      proj2[5],

      proj3[4],
      proj3[5],

      proj[0],
      proj[1],

      proj[4],
      proj[5],

      proj3[0],
      proj3[1]
    ];
  };

  styles() {
    return {
      fill: '#ff006f',
      closed: true
    };
  }
}

export default HasManyConnectorHandle;
