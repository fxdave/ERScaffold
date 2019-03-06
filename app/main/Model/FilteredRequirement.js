class FilteredRequirement  {
    /**
     *
     * @param {string} name
     * @param {RequirementCollection} children
     * @param {Function} data
     * @param {string} path
     * @param {string} templatePath
     * @param {boolean} enabled
     */
    constructor(name, children, data, path, templatePath, enabled) {
        this.name = name
        this.children = children
        this.data = data
        this.path = path
        this.templatePath = templatePath
        this.enabled = enabled
    }
}

export default FilteredRequirement