import React from 'react'
import Stage from './Stage'
import Entity from './Entity'
import { Layer } from 'react-konva'
import EntityModel from '../../../main/model/Entity';
import ConnectionModel from '../../../main/model/Connection';
import Connection from '../../../main/model/Connection';
import OneToOneConnection from './connections/OneToOneConnection'
import OneToManyConnection from './connections/OneToManyConnection'
import ManyToManyConnection from './connections/ManyToManyConnection'
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

    handleConnectEntity = (e) => {
        let conn = new ConnectionModel(
            e.from,
            e.to,
            e.type,
            "",
            this.getNextID(this.state.conns)
        );
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
            <Layer name="connectionLayer">
                {this.state.conns.map((conn,index) => {
                    switch(conn.type) {
                        case "hasOne":
                            return <OneToOneConnection {...conn} key={conn.id} />
                        case "hasMany":
                            return <OneToManyConnection {...conn} key={conn.id} />
                        case "belongsToMany":
                            return <ManyToManyConnection {...conn} key={conn.id} />
                    }
                })}
            </Layer>
            <Layer name="entityLayer">
                {this.state.entities.map((entity,index) => <Entity {...entity} change={this.handleEntityChange(index)} key={entity.id} onConnect={this.handleConnectEntity} />)}
            </Layer>
            <Layer name="tempLayer"></Layer>
        </Stage>
    }
}
export default Viewport