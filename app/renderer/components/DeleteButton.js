import React from 'react';
import { Group, Circle, Text } from 'react-konva';

class DeleteButton extends React.Component {
  render() {
    return (
      <Group>
        <Circle x={0} y={0} radius={10} fill="#ff006f" />
        <Text x={-4} y={-4} fontSize={10} text={'\u2715'} fill="#fff" />
      </Group>
    );
  }
}

export default DeleteButton;
