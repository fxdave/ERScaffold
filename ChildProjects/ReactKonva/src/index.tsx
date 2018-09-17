import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Group, Layer, Stage } from 'react-konva';
import Entity from './components/Entitiy'
class App extends React.Component {

    state : any = {
        entities : []
    }

    constructor(props : any) {
        super(props)
        this._addEntity = this._addEntity.bind(this)
    }

    public render() {
        return (
            <Stage width={window.innerWidth} height={window.innerHeight} draggable={true} onDblClick={this._addEntity}>
                <Layer>
                        { this.state.entities.map( (val :any)  => {
                            return <Group x={val.x} y={val.y} draggable={true}>
                                <Entity name={val.name}/>
                            </Group>
                        }) }
                </Layer>
            </Stage>
        );
    }

    public _addEntity(e : any) {
        this.state.entities.push({
            x: e.evt.clientX,
            y: e.evt.clientY,
            name : "valami"
        })
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
