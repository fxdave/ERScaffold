import React, { Component } from 'react';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Group } from 'react-konva';
import Entity from './components/Entitiy'
import EntitiyStorage from './storage/EntitiyStorage'
class App extends Component {

    constructor(props) {
        super(props)

        this.entities
    }

    _addEntity() {

    }

    render() {
        return (
            <Stage width={window.innerWidth} height={window.innerHeight} draggable>
                <Layer onDblClick={this._addEntity.bind(this)}>
                    <Group x={100} y={100} draggable>
                        <Entity />
                    </Group>
                </Layer>
            </Stage>
        );
    }
}

render(<App />, document.getElementById('root'));
