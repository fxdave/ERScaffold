
import EntityPacksPair from './EntityPacksPair'
import PackReader from './PackReader/PackReader'
import TemplateReader from './TemplateReader/TemplateReader'

class PackHandler {

    /**
     * 
     * @param {FsWrapper} fsWrapper 
     */
    constructor(fsWrapper) {
        this.packReader = new PackReader(fsWrapper)
        this.templateReader = new TemplateReader(fsWrapper)
    }

    /**
     * 
     * @param {Pack[]} packs 
     * @param {Entity} entiy 
     * @returns {Pack[]} with the templates with a "disabled" boolean member
     */
    _testPacksForEntity (packs, entiy) {
        return packs.map(pack => {
            
            pack.requirement = pack.requirements.map(req => {
                req.disabled = false
                if (req.data(entiy) === null) req.disabled = true

                return req
            })

            return pack

        })
    }

    /**
     * 
     * @async
     * @param {Entity[]} entities 
     * @returns {EntityPacksPair[]}
     */
    async getOptionsForEntities (entities) {
        const options = {}

        let packs = await this.packReader.getPacks()

        entities.forEach(entity => {
            options[entity.getID()] = new EntityPacksPair(
                entity, 
                this._testPacksForEntity(packs, entity)
            )
        })

        return Object.values(options)
    }

}

export default PackHandler