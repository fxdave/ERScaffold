import React from 'react';
import { Group } from 'react-konva';
import One from './One';
import MathHelper from '../../math/MathHelper';

class Many extends React.Component {
  render() {
    const from = this.props.from;
    const trough = this.props.trough;
    const to = this.props.to;
    const normal = this.props.normal;
    const coords = MathHelper.triangularProjection(trough, from, 7);

    const lines = [
      { from: { x: coords[0], y: coords[1] }, trough, to, normal },
      { from: { x: coords[2], y: coords[3] }, trough, to, normal },
      { from: { x: coords[4], y: coords[5] }, trough, to, normal }
    ];

    return (
      <Group>
        {lines.map((line, index) => (
          <One
            key={index}
            from={line.from}
            trough={line.trough}
            to={line.to}
            normal={normal}
          />
        ))}
      </Group>
    );
  }
}

export default Many;
