import IdentifiableModel from "./IdentifiableModel";

class Property extends IdentifiableModel {

    /**
     *
     * @param {number} id
     * @param {string} name
     * @param {number|undefined} x
     * @param {number|undefined} y
     * @param {number|undefined} type
     */
    constructor(id, name, x = 0, y = 0, type = 'string') {
        super(id)
        this.name = name
        this.type = type
        this.default = ''
        this.x = x
        this.y = y
    }
    /**
     * @returns {string}
     */
    getType() {
        return this.type
    }

    /**
     * @returns {number}
     */
    getID() {
        return this.id
    }

    /**
     * @returns {string}
     */
    getName() {
        return this.name
    }
}

export default Property