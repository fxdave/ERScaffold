import Pack from '../../Model/Pack'
import Requirement from '../../Model/Requirement'
import Config from '../../Config/Config'

const PACKS_FOLDER_URL = Config.PACKS_FOLDER_URL
class PackReader {

    /**
     *
     * @param {FsWrapper} fsWrapper
     */
    constructor (fsWrapper) {
        this.fsWrapper = fsWrapper
    }

    /**
     * @async
     * @param {string} packName 
     * @returns {Pack}
     */
    async getPack (packName) {
        const packIndexURL = `${PACKS_FOLDER_URL}/${packName}/index.pack.js`

        let pack = await this.fsWrapper.getScript(packIndexURL, 'pack')
        let requirements = await this.getRequirements(pack.requirements, pack.name)

        return new Pack(
            pack.name,
            requirements
        )
    }

    /**
     * @async
     * @param {Object} requirements 
     * @param {string} packName 
     * @returns {Object}
     */
    async getRequirements (requirements, packName) {
        return await Promise.all(
            requirements.map(
                req => this.getRequirement(req, packName)
            )
        )
    }

    /**
     * @async
     * 
     * @param {Object} requirement 
     * @param {string} requirement.name 
     * @param {Object[]} requirement.children 
     * 
     * @param {string} packName
     * 
     * @returns {Requirement}
     */
    async getRequirement (requirement, packName) {
        let fileName = `${PACKS_FOLDER_URL}/${packName}/${requirement.file}`
        let req = await this.fsWrapper.getScript(fileName, 'requirement')

        if (req.children) req.children = await this.getRequirements(req.children, packName)

        return new Requirement(req.name, req.children)
    }

    /**
     * @async
     * @returns {Pack[]}
     */
    async getPacks () {
        let packs = await this.fsWrapper.ls(PACKS_FOLDER_URL)
        return await Promise.all(packs.map(pack => this.getPack(pack)))
    }
}

export default PackReader
