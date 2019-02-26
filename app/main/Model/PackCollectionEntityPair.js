import PackCollection from './PackCollection'
import Entity from './Entity'

class PackCollectionEntityPair {
    /**
     * @param {Entity} entity
     * @param {PackCollection} packs
     */
    constructor(packs, entity) {
        this.entity = entity
        this.packs = packs
    }
}

export default PackCollectionEntityPair
