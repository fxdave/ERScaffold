class ProjectFolderSelector {

    /**
     * 
     * @param {string} projectFolderUrl the default folder, default: '.'
     */
    constructor(projectFolderUrl = '.', fsWrapper) {
        this.projectFolderUrl = projectFolderUrl
        this.fsWrapper = fsWrapper
    }

    /**
     * changes current working directory
     * @param {string} projectFolderUrl 
     */
    async select(projectFolderUrl) {
        this.projectFolderUrl = await this.fsWrapper.realpath(projectFolderUrl)
        process.chdir(this.projectFolderUrl)
    }

    /**
     * replaces current working directory with the given path in constructor
     */
    async apply() {
        await this.select(this.projectFolderUrl)
    }

    /**
     * checks wether current working directory is equal to the given path or not
     * @returns {boolean} 
     */
    async isSelected() {
        return (this.projectFolderUrl === '.' ) 
            ? process.cwd() === await this.fsWrapper.realpath('.')
            : process.cwd() === this.projectFolderUrl

    }

}

export default ProjectFolderSelector