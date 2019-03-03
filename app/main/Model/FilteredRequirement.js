import Requirement from './Requirement'

class FilteredRequirement extends Requirement  {
    /**
     *
     * @param {string} name
     * @param {RequirementCollection|undefined} children
     * @param {Function} data
     * @param {string} path
     * @param {boolean} enabled 
     */
    constructor(name, children, data, path, enabled) {
        super(name,children,data,path)
        this.enabled = enabled
    }
}

export default FilteredRequirement