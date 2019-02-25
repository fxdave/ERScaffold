class Connection {
  /**
   *
   * @param {Entity} from
   * @param {Entity} to
   * @param {string} type
   * @param {string} name
   * @param {number} id
   */
  constructor(from, to, type, name, id, x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.from = from;
    this.to = to;
    this.type = type;

    this.name = name;
    this.id = id;
  }

  /**
   * @returns {Entity}
   */
  getFrom() {
    return this.from;
  }

  /**
   * @returns {Entity}
   */
  getTo() {
    return this.to;
  }

  /**
   * @returns {string}
   */
  getType() {
    return this.type;
  }

  /**
   * @returns {string}
   */
  getName() {
    return this.name;
  }

  /**
   * @returns {number}
   */
  getID() {
    return this.id;
  }
}

export default Connection;
