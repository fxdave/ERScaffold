class FilteredRequirement  {
    /**
     *
     * @param {string} name
     * @param {RequirementCollection} children
     * @param {Function} data
     * @param {string} path
     * @param {boolean} enabled
     */
    constructor(name, children, data, path, enabled) {
        this.name = name
        this.children = children
        this.data = data
        this.path = path
        this.enabled = enabled
    }
}

export default FilteredRequirement