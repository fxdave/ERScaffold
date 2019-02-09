import React from 'react'
import { Group, Rect, Text } from 'react-konva';
import DeleteButton from './DeleteButton'
import {WidthAnchor, CenterAnchor, PositionAnchor} from 'react-konva-anchors'
import AddButton from './AddButton';
import HasManyConnectorHandle from './connections/HasManyConnectorHandle'
import HasOneConnectorHandle from './connections/HasOneConnectorHandle'
import BelongsToManyConnectorHandle from './connections/BelongsToManyConnectorHandle'

class Entity extends React.Component {

    constructor(props) {
        super(props)
        this.text = React.createRef()
        this.entity = React.createRef()
        this.bg = React.createRef()
        this.deleteButton = React.createRef()
        this.addButton = React.createRef()
        this.connHandle = React.createRef()
    }

    state = {
        bgWidth: 50,
        bgPos: { x: 0, y: 0 },
        textPos: { x: 0, y: 0 },
        deleteButtonPos: { x: 0, y: 0 },
        addButtonPos: { x: 0, y: 0 },
        connHandlePos: { x: 0, y: 0 },

    }

    handleMove = () => {
        this.props.change({
            x: this.entity.current.x(),
            y: this.entity.current.y()
        })
    }


    handleConnect = (props) => {
        this.props.onConnect({
            from: this,
            ...props
        })
    }

    render() {

        return <Group name="entity" entityInstance={this} ref={this.entity} draggable="true" x={this.props.x} y={this.props.y} onDragMove={this.handleMove} >

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

            <Group
                ref={this.connHandle}
                x={this.state.connHandlePos.x}
                y={this.state.connHandlePos.y}>
                <HasManyConnectorHandle onConnect={this.handleConnect} rotation={22.5}/>
                <HasOneConnectorHandle onConnect={this.handleConnect} rotation={67.5}/>
                <BelongsToManyConnectorHandle onConnect={this.handleConnect} rotation={112.5}/>
            </Group>

            <Group
                ref={this.deleteButton}
                x={this.state.deleteButtonPos.x}
                y={this.state.deleteButtonPos.y}>
                <DeleteButton />
            </Group>

            <Group
                ref={this.addButton}
                x={this.state.addButtonPos.x}
                y={this.state.addButtonPos.y}>
                <AddButton />
            </Group>

            <CenterAnchor
                element={() => this.bg.current}
                change={(x, y) => this.setState({ bgPos: { x, y } })} />


            <PositionAnchor 
                element={() => this.connHandle.current}
                elementOrigin={{x:0,y:0.5}}
                elementDesiredOrigin={{x:0, y:0.5}}

                reference={() => this.bg.current}
                referenceOrigin={{x:0,y:0}}
                referenceDesiredOrigin={{x:1, y:1}}
                change={(x, y) => this.setState({ connHandlePos: { x, y } })}
            />
            
            <PositionAnchor
                
                element={() => this.text.current}
                elementOrigin={{x:0,y:0}}
                elementDesiredOrigin={{x:0.5, y:0.5}}

                reference={() => this.bg.current}
                referenceOrigin={{x:0,y:0}}
                referenceDesiredOrigin={{x:0.5, y:0.5}}

                change={(x, y) => this.setState({ textPos: { x, y } })} />


            <PositionAnchor
                
                element={() => this.deleteButton.current}
                elementOrigin={{x:0.5,y:0.5}}
                elementDesiredOrigin={{x:0.5, y:0.5}}

                reference={() => this.bg.current}
                referenceOrigin={{x:0,y:0}}
                referenceDesiredOrigin={{x:1, y:0}}

                change={(x, y) => this.setState({ deleteButtonPos: { x, y } })} />
            
            <PositionAnchor
                
                element={() => this.addButton.current}
                elementOrigin={{x:0.5,y:0.5}}
                elementDesiredOrigin={{x:0.5, y:0.5}}

                reference={() => this.bg.current}
                referenceOrigin={{x:0,y:0}}
                referenceDesiredOrigin={{x:1, y:0}}

                shift={{x:-25, y:0}}

                change={(x, y) => this.setState({ addButtonPos: { x, y } })} />
            
            <WidthAnchor
                reference={() => this.text.current}
                element={() => this.bg.current}
                padding={25}
                change={width => this.setState({ bgWidth: width })} />

        </Group>
    }
}

export default Entity