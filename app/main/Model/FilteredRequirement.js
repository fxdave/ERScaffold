import Requirement from './Requirement'

class FilteredRequirement  {

    /**
     * 
     * @param {Requirement} requirement 
     * @param {boolean} enabled 
     */
    constructor(requirement, enabled) {
        this.requirement = requirement
        this.enabled = enabled
    }
}

export default FilteredRequirement