import { promises as fsp } from "fs";

class ProjectFolderSelector {

    /**
     * 
     * @param {string} projectFolderUrl the default folder, default: '.'
     */
    constructor(projectFolderUrl = '.') {
        this.projectFolderUrl = projectFolderUrl
    }

    /**
     * changes current working directory
     * @param {string} projectFolderUrl 
     */
    select(projectFolderUrl) {
        this.projectFolderUrl = projectFolderUrl

        if(projectFolderUrl != '.')
        process.chdir(projectFolderUrl)
    }

    /**
     * replaces current working directory with the given path in constructor
     */
    apply() {
        this.select(this.projectFolderUrl)
    }

    /**
     * checks wether current working directory is equal to the given path or not
     * @returns {boolean} 
     */
    async isSelected() {
        return (this.projectFolderUrl === '.' ) 
            ? process.cwd() === await fsp.realpath('.')
            : process.cwd() === this.projectFolderUrl

    }

}

export default ProjectFolderSelector