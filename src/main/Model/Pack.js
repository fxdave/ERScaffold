import RequirementCollection from './RequirementCollection'

class Pack {
    /**
     *
     * @param {string} name
     * @param {RequirementCollection} requirementList
     */
    constructor(name, requirementCollection) {
        this.name = name
        this.requirementCollection = requirementCollection
    }
}

export default Pack
