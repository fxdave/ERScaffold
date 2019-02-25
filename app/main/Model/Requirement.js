class Requirement {

    /**
     * 
     * @param {string} name 
     * @param {Requirement[]|undefined} children
     * @param {Function|undefined} data 
     */
    constructor(name, children, data) {
        this.name = name
        this.children = children
        this.data = data
    }
}

export default Requirement