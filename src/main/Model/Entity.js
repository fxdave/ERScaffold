import {
  HasManyRelation,
  HasOneRelation,
  BelongsToRelation,
  BelongsToManyRelation
} from "./Relation";
import NameFormatter from "../Formatter/NameFormatter";

class Entity {
  /**
   *
   * @param {number} id
   * @param {string} name
   * @param {Array<Property>} props
   * @param {number} x
   * @param {number} y
   * @param {string} context
   */
  constructor(id, name, props, x, y, context = undefined) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.name = name;
    this.props = props;
    this.context = context;

    this.relations = {
      hasMany: [],
      belongsTo: [],
      hasOne: [],
      belongsToMany: []
    };
  }

  /**
   * @returns {number}
   */
  getID() {
    return this.id;
  }

  /**
   * @returns {string}
   */
  getName() {
    return this.name;
  }

  /**
   * @returns {Array<Property>}
   */
  getProps() {
    return this.props;
  }

  /**
   *
   * @param {Relation} relation
   */
  addRelation(relation) {
    if (relation instanceof HasManyRelation)
      this.relations.hasMany.push(relation);
    else if (relation instanceof BelongsToRelation)
      this.relations.belongsTo.push(relation);
    else if (relation instanceof HasOneRelation)
      this.relations.hasOne.push(relation);
    else if (relation instanceof BelongsToManyRelation)
      this.relations.belongsToMany.push(relation);
  }

  /**
   * @returns {Array<Relation>}
   */
  getHasManyRelations() {
    return this.relations.hasMany;
  }

  /**
   * @returns {Array<Relation>}
   */
  getHasOneRelations() {
    return this.relations.hasOne;
  }

  /**
   * @returns {Array<Relation>}
   */
  getBelongsToRelations() {
    return this.relations.belongsTo;
  }

  /**
   * @returns {Array<Relation>}
   */
  getBelongsToManyRelations() {
    return this.relations.belongsToMany;
  }
}

export default Entity;
