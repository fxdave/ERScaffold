import Requirement from './Requirement'
import Entity from './Entity'
import FilteredRequirement from './FilteredRequirement'
class RequirementCollection extends Array {

    /**
     * 
     * @param {Entity} entity 
     */
    filterForEntity(entity) {
        return this.map(
            /**
             * @param {Requirement} requirement
             */
            requirement => {
                return new FilteredRequirement(requirement, requirement.data(entity) !== null)
            }
        )
    }
}

export default RequirementCollection