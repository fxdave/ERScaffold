import SimpleGit from 'simple-git'
import Config from '../Config/Config'

const ERSCAFFOLD_BRANCH_NAME = Config.ERSCAFFOLD_BRANCH_NAME
const COMMIT_MESSAGE = Config.COMMIT_MESSAGE

class GitWrapper {
    /**
     *
     * @param {SimpleGit} simpleGit
     */
    constructor(simpleGit) {
        this.simpleGit = simpleGit
    }

    /**
     * Checks if the ERScaffold branch is created or not
     * @returns {Promise} will be resolved with bool
     */
    hasERBranch() {
        return new Promise((resolve, reject) => {
            this.simpleGit
                .branchLocal()
                .then(summary => {
                    const interest = Object.keys(summary.branches).filter(
                        name => name.indexOf(ERSCAFFOLD_BRANCH_NAME) != -1
                    )
                    resolve(interest.length == 1)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    /**
     * Creates ERBranch from the current branch
     * @returns {Promise}
     */
    createAndCheckoutERBranch() {
        return this.simpleGit.checkout(['-b', ERSCAFFOLD_BRANCH_NAME])
    }

    /**
     * checkout to ERBranch
     * @returns {Promise}
     */
    checkoutERBranch() {
        return this.simpleGit.checkout([ERSCAFFOLD_BRANCH_NAME])
    }

    /**
     * Commits modifications
     * @returns {Promise}
     */
    commit() {
        return this.simpleGit.commit(COMMIT_MESSAGE, '.')
    }

    /**
     * Rolls back to the first commit
     * @returns {Promise}
     */
    rollbackToFirstCommit() {
        return this.simpleGit.log(['--first-parent']).then(summary => {
            const lastHash = summary.all[summary.length - 1].hash
            return this.simpleGit.revert(lastHash)
        })
    }
}

export default GitWrapper
