import RequirementCollection from './RequirementCollection'

class Requirement {
    /**
     *
     * @param {string} name
     * @param {RequirementCollection|undefined} children
     * @param {Function|undefined} data
     */
    constructor(name, children, data) {
        this.name = name
        this.children = children
        this.data = data
    }
}

export default Requirement
