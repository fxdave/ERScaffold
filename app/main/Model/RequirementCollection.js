import Requirement from './Requirement'
import Entity from './Entity'
import FilteredRequirement from './FilteredRequirement'
class RequirementCollection extends Array {

    /**
     * 
     * @param {Entity} entity 
     * @returns {FilteredRequirement[]}
     */
    filterForEntity(entity) {
        return this.map(
            /**
             * @param {Requirement} requirement
             */
            requirement => {
                return requirement.filterForEntity(Entity)
            }
        )
    }
}

export default RequirementCollection