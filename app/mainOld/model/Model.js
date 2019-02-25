import Entity from './Entity';
import Connection from './Connection';
import Property from './Property';
import {
  Relation,
  HasManyRelation,
  HasOneRelation,
  BelongsToRelation,
  BelongsToManyRelation
} from './Relation';

class Model {
  /**
   *
   * @param {Object} data
   */
  constructor(data) {
    this.entities = {};
    this.connections = [];

    data.entities.forEach(entity => {
      this.entities[entity.id] = new Entity(
        entity.id,
        entity.name,
        entity.props.map(v => new Property(v.id, v.name))
      );
    });

    data.conns.forEach(connection => {
      const c = new Connection(
        this.entities[connection.from],
        this.entities[connection.to],
        connection.type,
        connection.name,
        connection.id
      );

      this.connections.push(c);

      if (connection.type == 'OneToOne') {
        this.entities[connection.from].addRelation(
          new HasOneRelation(
            this.entities[connection.from],
            this.entities[connection.to]
          )
        );
        this.entities[connection.to].addRelation(
          new BelongsToRelation(
            this.entities[connection.to],
            this.entities[connection.from]
          )
        );
      } else if (connection.type == 'OneToMany') {
        this.entities[connection.from].addRelation(
          new HasManyRelation(
            this.entities[connection.from],
            this.entities[connection.to]
          )
        );

        this.entities[connection.to].addRelation(
          new BelongsToRelation(
            this.entities[connection.to],
            this.entities[connection.from]
          )
        );
      } else if (connection.type == 'ManyToMany') {
        this.entities[connection.from].addRelation(
          new BelongsToManyRelation(
            this.entities[connection.from],
            this.entities[connection.to]
          )
        );

        this.entities[connection.to].addRelation(
          new BelongsToManyRelation(
            this.entities[connection.to],
            this.entities[connection.from]
          )
        );
      } else {
        console.error('Model: Not valid connection type');
      }
    });
  }

  /**
   * @returns {Array<Entitiy>}
   */
  getEntities() {
    return Object.values(this.entities);
  }

  /**
   * @returns {Array<Connection>}
   */
  getConnections() {
    return this.connections;
  }
}

export default Model;
