const util = require('util')
const exec = util.promisify(require('child_process').exec)

module.exports = class GitWrapper {
    /**
     * 
     * @param {ProjectFolderSelector} projectFolderSelector
     */
    constructor(projectFolderSelector) {
        this.projectFolderSelector = projectFolderSelector
    }

    /**
     * changes the basedir
     */
    changeWorkDir() {
        this.projectFolderSelector.apply()
    }

    /**
     * @returns {boolean}
     */
    async isGitInstalled() {
        try {
            await exec('git --help')
            return true
        } catch (e) {
            return false
        }
    }

    /**
     * @returns {boolean}
     */
    async isItGitRepository() {
        this.changeWorkDir()
        try {
            await exec('git status')
            return true
        } catch (e) {
            return false
        }
    }

    /**
     * @returns {boolean}
     */
    async isTreeClean() {
        this.changeWorkDir()
        try {
            const res = await exec('git status')
            return res.stdout.indexOf('nothing to commit') !== -1
        } catch (e) {
            return false
        }
    }


    /**
     * 
     * @param {string} branchname 
     * @returns {boolean}
     */
    async hasBranch(branchname) {
        this.changeWorkDir()
        try {
            await exec('git rev-parse --verify ' + branchname)
            return true
        } catch (e) {
            return false
        }
    }

    /**
     * 
     * @param {string} branchname 
     * @param {boolean} create? 
     */
    async checkout(branchname, create) {
        this.changeWorkDir()
        await exec('git checkout ' + (create ? '-b ' : '') + branchname)
    }

    /**
     * 
     * @returns {string}
     */
    async getBranchName() {
        this.changeWorkDir()
        const res = await exec('git rev-parse --abbrev-ref HEAD')
        return res.stdout.replace(/\n/g, '')
    }

    /**
     * 
     * @param {string} branchname 
     * @param {boolean} create? 
     */
    async removeBranch(branchname) {
        this.changeWorkDir()
        let name = await this.getBranchName()

        if (name === branchname) {
            await this.checkout('master', false)
        }
        await exec('git branch -d ' + branchname)
    }

    /**
     *  
     * @param {string} commit_id 
     */
    async revert(commit_id) {
        this.changeWorkDir()
        await exec('git revert ' + commit_id)
    }

    /**
     * 
     * @param {string} files 
     */
    async add(files) {
        this.changeWorkDir()
        await exec('git add ' + files)
    }

    /**
     * 
     * @param {string} message 
     */
    async commit(message) {
        this.changeWorkDir()
        await exec('git commit -m "' + message.replace(/"/g, '\"') + '"')
    }

    /**
     * @returns {string}
     */
    async getLastCommitID() {
        this.changeWorkDir()
        const res = await exec('git log --format="%H" -n 1')
        return res.stdout.replace(/\n/g, '')
    }
    
    /**
     * @returns {string}
     */
    async getPreviousCommitID() {
        this.changeWorkDir()
        const res = await exec('git log --format="%H" --skip 1 -n 2')
        return res.stdout.replace(/\n/g, '')
    }
}