import React from 'react'
import { Group, Rect, Text } from 'react-konva';


class Entity extends React.Component {

    state = {
        width: 50
    }

    render() {
        return <Group draggable="true" >
            <Rect
                x={this.props.x}
                y={this.props.y}
                width={this.state.width}
                height={50}
                cornerRadius="10"
                fill="#2f2f2f" />
            <Text
                text={this.props.name}
                fontSize="22"
                fill="#fff"
                fontFamily="Open Sans" />
        </Group>
    }
}

export default Entity