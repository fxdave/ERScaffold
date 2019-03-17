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
     * @param {string} templatePath
     */
    constructor(name, children, data, path, templatePath) {
        this.name = name
        this.children = children
        this.data = data
        this.path = path
        this.templatePath = templatePath
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
            this.templatePath,
            this.data(entity) !== null
        )
    }
}

export default Requirement