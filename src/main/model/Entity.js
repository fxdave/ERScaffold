
class Entity {
    /**
     * 
     * @param {number} id 
     * @param {string} name 
     * @param {Array<Property>} props 
     */
    constructor(id, name, props){
        this.id = id
        this.name = name
        this.props = props
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

    /**
     * @returns {Array<Property>}
     */
    getProps() {
        return this.props
    }
}


export default Entity