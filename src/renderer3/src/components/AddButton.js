import React from 'react'
import { Group, Circle, Text } from 'react-konva'

class AddButton extends React.Component {

    render() {
        return <Group>
            <Circle
                x={0}
                y={0}
                radius={10}
                fill="#00cc00"
            ></Circle>
            <Text
                x={-4}
                y={-4}
                fontSize={10}
                text="+"
                fill="#fff"
            ></Text>
        </Group>
    }
}

export default AddButton