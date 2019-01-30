import React from 'react'
import Stage from './Stage'
import Entity from './Entity'
import { Layer } from 'react-konva'
import EntityModel from '../../../main/model/Entity';

class Viewport extends React.Component {
    constructor(props) {
        super(props)
        this.stage = React.createRef()
    }

    state = {
        entities: [],
        conns: []
    };

    handleAddEntity = (e) => {
        console.log("Entity has been added");
        let x = this.stage.current.subtractDragX(e.evt.clientX);
        let y = this.stage.current.subtractDragY(e.evt.clientY);

        this.setState((state) => ({
            entities: [
                ...state.entities,
                new EntityModel(
                    this.getNextID(this.state.entities), "Hello", [], x, y
                )
            ]
        }))

        //new EntityModel(this.getNextID(this.entities), "Music", [], x, y)
    }

    handleEntityChange = (index) => (entityModifications) => {
        let entities = [...this.state.entities]
        entities[index] = {
            ...entities[index],
            ...entityModifications
        }
        this.setState({
            entities: entities
        })
    }

    handleDeleteEntity = (e) => {
        console.log("Entity has been deleted");
        this.setState((state) => {
            entities: state.entities.filter(entity => entity.id != e.id)
        })
    }

    handleConnectEntity = (e) => {/*
        let conn = new ConnectionModel(
            e.from,
            e.to,
            e.type,
            "",
            this.getNextID(
                this.conns["hasOne"].concat(
                    this.conns["hasMany"],
                    this.conns["belongsToMany"]
                )
            )
        );*/
        let conn = { name: "Hellp" }

        this.setState(state => ({
            conns: [...state.conns, conn]
        }))
    }

    handleDeleteConnection = (e) => {
        console.log("Connection has been deleted");
        this.setState((state) => {
            conns: state.conns.filter(conn => conn.id != e.id)
        })
    }

    getNextID(arr) {
        return (
            arr.reduce((acc, x) => {
                if (x.id > acc) return x.id;
                return acc;
            }, 0) + 1
        );
    }

    render() {
        return <Stage ref={this.stage} onDblClick={this.handleAddEntity}>
            <Layer>
                {this.state.entities.map((entity,index) => <Entity {...entity} change={this.handleEntityChange(index)} key={entity.id} />)}
            </Layer>
        </Stage>
    }
}
export default Viewport