import React from 'react'
import { RegularPolygon, Group } from 'react-konva';
import DeleteButton from '../DeleteButton';
import { PositionAnchor } from 'react-konva-anchors';

class Relation extends React.Component {
    constructor(props) {
        super(props)
        this.relation = React.createRef()
        this.bg = React.createRef()
        this.deleteButton = React.createRef()
    }

    state = {
        deleteButtonPos: {x:0,y:0}
    }

    render() {
        return <Group ref={this.relation} {...this.props} draggable={true} onDragMove={this.handleMove}>
            <RegularPolygon 
                ref={this.bg}
                sides={4}
                radius={10}
                stroke="black"
                strokeWidth={1}
                fill="#fff"
            />
            <Group onClick={this.props.onDelete} ref={this.deleteButton} x={this.state.deleteButtonPos.x} y={this.state.deleteButtonPos.y}>
                <DeleteButton />
            </Group>

            <PositionAnchor 
                element={() => this.deleteButton.current}
                elementOrigin={{x:0.5,y:0.5}}
                elementDesiredOrigin={{x:0.5,y:0.5}}

                reference={() => this.bg.current}
                referenceOrigin={{x:0.5, y:0.5}}
                referenceDesiredOrigin={{x:1, y:0.5}}

                change={(x, y) => this.setState({ deleteButtonPos: { x, y } })}
            />
        </Group>
    }

    handleMove = () => {
        this.props.onChange({
            x: this.relation.current.x(),
            y: this.relation.current.y()
        })
    }
}

export default Relation