import Pack from '../../Model/Pack'
import path from 'path'

/**
 * utilities for getting information from a single pack
 */
class PackReader {
    /**
     *
     * @param {FsWrapper} fsWrapper
     * @param {RequirementReader} requirementReader
     */
    constructor(fsWrapper, requirementReader) {
        this.fsWrapper = fsWrapper
        this.requirementReader = requirementReader
    }

    /**
     * @async
     * @param {string} packIndexPath path of the pack index file e.g pack.index.js
     * @returns {Pack}
     */
    async getPack(packIndexPath) {
        let pack = await this.fsWrapper.getScript(packIndexPath, 'pack')
        let packDirectory = path.dirname(packIndexPath)
        
        let requirements = await this.requirementReader.getRequirements(pack.requirements, packDirectory)

        return new Pack(pack.name, requirements)
    }

}

export default PackReader
