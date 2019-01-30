import React from 'react'
import { Group, Rect, Text } from 'react-konva';
import PositionAnchor from './anchors/PositionAnchor';
import WidthAnchor from './anchors/WidthAnchor';
import CenterAnchor from './anchors/CenterAnchor';
import DeleteButton from './DeleteButton'
class Entity extends React.Component {

    constructor(props) {
        super(props)
        this.text = React.createRef()
        this.entity = React.createRef()
        this.bg = React.createRef()
        this.deleteButton = React.createRef()
    }

    state = {
        bgWidth: 50,
        bgPos: { x: 0, y: 0 },
        textPos: { x: 0, y: 0 },
        deleteButtonPos: { x: 0, y: 0 }
    }

    handleMove = () => {
        this.props.change({
            x: this.entity.current.x(),
            y: this.entity.current.y()
        })
    }

    render() {

        return <Group ref={this.entity} draggable="true" x={this.props.x} y={this.props.y} onDragMove={this.handleMove} >

            <Rect
                ref={this.bg}
                width={this.state.bgWidth}
                height={50}
                cornerRadius={10}
                x={this.state.bgPos.x}
                y={this.state.bgPos.y}
                fill="#2f2f2f" />

            <Text
                ref={this.text}
                x={this.state.textPos.x}
                y={this.state.textPos.y}
                text={this.props.name}
                fontSize={22}
                fill="#fff"
                fontFamily="Open Sans" />

            <Group ref={this.deleteButton}>
                <DeleteButton
                    x={this.state.deleteButtonPos.x}
                    y={this.state.deleteButtonPos.y}
                />
            </Group>

            <CenterAnchor
                element={() => this.bg.current}
                change={(x, y) => this.setState({ bgPos: { x, y } })} />

            <PositionAnchor
                top={0}
                left={0}
                right={0}
                bottom={0}
                centered={false}
                element={() => this.text.current}
                reference={() => this.bg.current}
                change={(x, y) => this.setState({ textPos: { x, y } })} />

            <PositionAnchor
                top={0}
                right={0}
                centered={true}
                element={() => this.deleteButton.current}
                reference={() => this.bg.current}
                change={(x, y) => this.setState({ deleteButtonPos: { x, y } })} />

            <WidthAnchor
                reference={() => this.text.current}
                element={() => this.bg.current}
                padding={25}
                change={width => this.setState({ bgWidth: width })} />

        </Group>
    }

}

export default Entity