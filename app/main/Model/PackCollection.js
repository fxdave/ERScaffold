import PackCollectionEntityPair from './PackCollectionEntityPair'
import Pack from './Pack'
class PackCollection extends Array {
    /**
     *
     * @param {PackCollection} packs
     * @param {Entity} entity
     * @returns {PackCollection} with the templates with a "disabled" boolean member
     */
    _testPacksForEntity(entity) {
        return this.map(
            /**
             * @param {Pack} pack
             */
            pack => new Pack(pack.name, pack.requirementCollection.filterForEntity(entity))
        )
    }
  
    /**
     *
     * @param {Entity[]} entities
     * @returns {PackCollectionEntityPair[]}
     */
    getOptionsForEntities(entities) {
        
        return entities.map(entity => 
            new PackCollectionEntityPair(
                entity,
                this._testPacksForEntity(entity)
            )
        )
    }
}

export default PackCollection