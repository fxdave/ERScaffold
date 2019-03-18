class IdentifiableModel {
    /**
     *
     * @param {number} id
     * @param {string} name
     */
    constructor(id) {
        if (id)
            this.id = IdentifiableModel.comparedID(id)
        else
            this.id = IdentifiableModel.getNextID()
    }

    static lastID = 0

    /**
     * @returns {number}
     */
    static getNextID() {
        this.lastID = this.lastID + 1
        return this.lastID
    }

    /**
     * @param {number} id
     * @returns {number}
     */
    static comparedID(id) {
        if (this.lastID < id) {
            this.lastID = id
        }
        return id
    }
}

export default IdentifiableModel