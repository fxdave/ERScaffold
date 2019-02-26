import Pack from '../../Model/Pack'
import Requirement from '../../Model/Requirement'

/**
 * utilities for getting information from a single pack
 */
class PackReader {
    /**
     *
     * @param {FsWrapper} fsWrapper
     */
    constructor(fsWrapper) {
        this.fsWrapper = fsWrapper
    }

    /**
     * @async
     * @param {string} packIndexPath path of the pack index file e.g pack.index.js
     * @returns {Pack}
     */
    async getPack(packIndexPath) {
        let pack = await this.fsWrapper.getScript(packIndexPath, 'pack')
        let packDirectory = path.dirname(packIndexPath)
        let requirements = await this.getRequirements(pack.requirements, packDirectory)

        return new Pack(pack.name, requirements)
    }

    /**
     * @async
     * @param {Object} requirements
     * @param {string} packDirectory
     * @returns {Object}
     */
    async getRequirements(requirements, packDirectory) {
        return await Promise.all(
            requirements.map(req => this.getRequirement(req, packDirectory))
        )
    }

    /**
     * @async
     *
     * @param {Object} requirement
     * @param {string} requirement.name
     * @param {Object[]} requirement.children
     *
     * @param {string} packDirectory
     *
     * @returns {Requirement}
     */
    async getRequirement(requirement, packDirectory) {
        let fileName = path.join(packDirectory, requirement.file)
        let req = await this.fsWrapper.getScript(fileName, 'requirement')

        if (req.children)
            req.children = await this.getRequirements(req.children, packDirectory)

        return new Requirement(req.name, req.children)
    }
}

export default PackReader
