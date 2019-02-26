import Requirement from './Requirement'
import Entity from './Entity'

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
                return new FilteredRequirement(requirement, requirement.data(entiy) !== null)
            }
        )
    }
}

export default RequirementCollection