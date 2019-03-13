import Requirement from '../../Model/Requirement'
import RequirementCollection from '../../Model/RequirementCollection'
import path from 'path'

class RequirementReader {

    /**
     * @param {FsWrapper} fsWrapper
     */
    constructor(fsWrapper) {
        this.fsWrapper = fsWrapper
    }

    /**
     * @async
     * @param {Object} requirements
     * @param {string} packDirectory
     * @returns {RequirementCollection}
     */
    async getRequirements(requirements, packDirectory) {
        if (requirements)
            return new RequirementCollection(...(await Promise.all(
                requirements.map(req => this.getRequirement(path.join(packDirectory, req.file)))
            )))
        return new RequirementCollection()
    }

    /**
     * @async
     *
     * @param {string} pathToRequirement
     *
     * @returns {Requirement}
     */
    async getRequirement(pathToRequirement) {

        // get the pack directory
        let packDirectory = path.dirname(pathToRequirement) || ''

        // get the file's content
        let req = await this.fsWrapper.getScript(pathToRequirement, 'requirement')

        if (!req.name || !req.data) {
            throw new Error('Not vaild requirement: ' + pathToRequirement)
        }

        // process children
        let children = await this.getRequirements(req.children, packDirectory)

        return new Requirement(req.name, children, req.data, pathToRequirement, path.join(packDirectory, req.template))
    }
}

export default RequirementReader