
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

        this.hasManyRelations = []
        this.hasOneRelations = []
        this.belongsToRelations = []
        this.belongsToManyRelations = []
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

    /**
     * 
     * @param {Connection} relation 
     */
    addHasManyRelation(relation) {
        this.hasManyRelations.push(relation)
    }

    /**
     * 
     * @param {Connection} relation 
     */
    addHasOneRelation(relation) {
        this.hasOneRelations.push(relation)
    }

    /**
     * 
     * @param {Connection} relation 
     */
    addBelongsToRelation(relation) {
        this.belongsToRelations.push(relation)
    }

    /**
     * 
     * @param {Connection} relation 
     */
    addBelongsToManyRelation(relation) {
        this.belongsToManyRelations.push(relation)
    }

    /**
     * @returns {Array<Connection>}
     */
    getHasManyRelations() {
        return this.getHasManyRelations
    }

    /**
     * @returns {Array<Connection>}
     */
    getHasOneRelations() {
        return this.hasOneRelations
    }

    /**
     * @returns {Array<Connection>}
     */
    getBelongsToRelations() {
        return this.belongsToRelations
    }

    /**
     * @returns {Array<Connection>}
     */
    getBelongsToManyRelations() {
        return this.belongsToManyRelations
    }
}


export default Entity