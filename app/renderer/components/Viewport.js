import React from 'react';
import { Layer } from 'react-konva';
import Stage from './Stage';
import Entity from './Entity';
import EntityModel from '../../main/model/Entity';
import ConnectionModel from '../../main/model/Connection';
import ProperyModel from '../../main/model/Property';
import OneToOneConnection from './connections/OneToOneConnection';
import OneToManyConnection from './connections/OneToManyConnection';
import ManyToManyConnection from './connections/ManyToManyConnection';

class Viewport extends React.Component {
  constructor(props) {
    super(props);
    this.stage = React.createRef();

    this.props.setModelData(data => {
      this.setState(data);
    });

    this.props.getModelData(() => this.state);
  }

  state = {
    entities: [],
    conns: []
  };

  handleAddEntity = e => {
    console.log('Entity has been added');
    const x = this.stage.current.subtractDragX(e.evt.clientX);
    const y = this.stage.current.subtractDragY(e.evt.clientY);

    this.setState(state => ({
      entities: [
        ...state.entities,
        new EntityModel(
          this.getNextID(this.state.entities),
          '',
          [new ProperyModel(1, 'ID', 0, 0, 'integer')],
          x,
          y
        )
      ]
    }));

    // new EntityModel(this.getNextID(this.entities), "Music", [], x, y)
  };

  handleConnectionChange = index => connectionModifications => {
    const conns = [...this.state.conns];
    conns[index] = {
      ...conns[index],
      ...connectionModifications
    };
    this.setState({
      conns
    });
  };

  handleEntityChange = index => entityModifications => {
    const entities = [...this.state.entities];
    entities[index] = {
      ...entities[index],
      ...entityModifications
    };
    this.setState({
      entities
    });
  };

  handleDeleteEntity = id => () => {
    console.log('Entity has been deleted');
    this.setState({
      entities: this.state.entities.filter(e => e.id != id),
      conns: this.state.conns.filter(
        c => c.from.props.id != id && c.to.props.id != id
      )
    });
  };

  /**
   *
   * @param {Object} e
   * @param {Entity} e.from
   * @param {Entity} e.to
   * @param {string} e.type
   */
  handleConnectEntity = e => {
    const x = (e.from.props.x + e.to.props.x) / 2;
    const y = (e.from.props.y + e.to.props.y) / 2;

    const conn = new ConnectionModel(
      e.from,
      e.to,
      e.type,
      '',
      this.getNextID(this.state.conns),
      x,
      y
    );
    this.setState(state => ({
      conns: [...state.conns, conn]
    }));
  };

  handleDeleteConnection = id => () => {
    console.log('Connection has been deleted');
    this.setState({
      conns: this.state.conns.filter(conn => conn.id != id)
    });
  };

  getNextID(arr) {
    return (
      arr.reduce((acc, x) => {
        if (x.id > acc) return x.id;
        return acc;
      }, 0) + 1
    );
  }

  render() {
    return (
      <Stage ref={this.stage} onDblClick={this.handleAddEntity}>
        <Layer name="connectionLayer">
          {this.state.conns.map((conn, index) => {
            let ConnectionType = OneToOneConnection;
            switch (conn.type) {
              case 'hasOne':
                ConnectionType = OneToOneConnection;
                break;
              case 'hasMany':
                ConnectionType = OneToManyConnection;
                break;
              case 'belongsToMany':
                ConnectionType = ManyToManyConnection;
                break;
            }
            return (
              <ConnectionType
                {...conn}
                key={conn.id}
                fromProps={
                  this.state.entities.filter(e => e.id == conn.from.props.id)[0]
                }
                toProps={
                  this.state.entities.filter(e => e.id == conn.to.props.id)[0]
                }
                onChange={this.handleConnectionChange(index)}
                onDelete={this.handleDeleteConnection(conn.id)}
              />
            );
          })}
        </Layer>
        <Layer name="entityLayer">
          {this.state.entities.map((entity, index) => (
            <Entity
              {...entity}
              key={entity.id}
              onChange={this.handleEntityChange(index)}
              onConnect={this.handleConnectEntity}
              onDelete={this.handleDeleteEntity(entity.id)}
            />
          ))}
        </Layer>
        <Layer name="tempLayer" />
      </Stage>
    );
  }
}
export default Viewport;
