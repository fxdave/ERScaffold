

class Property {
    /**
     * 
     * @param {number} id 
     * @param {string} name 
     */
    constructor(id,name) {
        this.id = id,
        this.name = name
        this.type = "string"
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
        return  this.id
    }


    /**
     * @returns {string}
     */
    getName() {
        return this.name
    }
}

export default Property