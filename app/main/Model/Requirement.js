import RequirementCollection from './RequirementCollection'
import Entity from './Entity'
import FilteredRequirement from './FilteredRequirement'
class Requirement {
    /**
     *
     * @param {string} name
     * @param {RequirementCollection} children
     * @param {Function} data
     * @param {string} path
     */
    constructor(name, children, data, path) {
        this.name = name
        this.children = children
        this.data = data
        this.path = path
    }

    /**
     * 
     * @param {Entity} entity 
     * @returns {FilteredRequirement}
     */
    filterForEntity(entity) {
        return new FilteredRequirement(
            this.name, 
            this.children.filterForEntity(entity), 
            this.data, 
            this.path,
            this.data(entity) !== null
        )
    }
}

export default Requirement