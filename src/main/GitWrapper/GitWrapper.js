const util = require('util')
const exec = util.promisify(require('child_process').exec)

module.exports = class GitWrapper {
    /**
     * 
     * @param {string} workdir 
     */
    constructor(workdir) {
        process.chdir(workdir)
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
        await exec('git checkout ' + (create ? '-b ' : '') + branchname)
    }

    /**
     * 
     * @returns {string}
     */
    async getBranchName() {
        const res = await exec('git rev-parse --abbrev-ref HEAD')
        return res.stdout.replace(/\n/g, '')
    }

    /**
     * 
     * @param {string} branchname 
     * @param {boolean} create? 
     */
    async removeBranch(branchname) {
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
        await exec('git revert ' + commit_id)
    }

    /**
     * 
     * @param {string} files 
     */
    async add(files) {
        await exec('git add ' + files)
    }

    /**
     * 
     * @param {string} message 
     */
    async commit(message) {
        await exec('git commit -m "' + message.replace(/"/g, '\"') + '"')
    }

    /**
     * @returns {string}
     */
    async getLastCommitID() {
        const res = await exec('git log --format="%H" -n 1')
        return res.stdout.replace(/\n/g, '')
    }
    
    /**
     * @returns {string}
     */
    async getPreviousCommitID() {
        const res = await exec('git log --format="%H" --skip 1 -n 2')
        return res.stdout.replace(/\n/g, '')
    }
}