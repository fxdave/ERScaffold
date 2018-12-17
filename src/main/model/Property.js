

class Property {
    /**
     * 
     * @param {number} id 
     * @param {string} name 
     */
    constructor(id,name) {
        this.id = id,
        this.name = name
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