const ERSCAFFOLD_BRANCH_NAME = 'ERBranch'
const COMMIT_MESSAGE = 'ER model has generated'

const git = {}

git.sgit = undefined
git.hasERBranch =
  /**
   * Checks if the ERScaffold branch is created or not
   * @returns {Promise} will be resolved with bool
   */
  function () {
    return new Promise((resolve, reject) => {
      git.sgit
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

git.createAndCheckoutERBranch =
  /**
   * Creates ERBranch from the current branch
   * @returns {Promise}
   */
  function () {
    return git.sgit.checkout(['-b', ERSCAFFOLD_BRANCH_NAME])
  }

git.checkoutERBranch =
  /**
   * checkout to ERBranch
   * @returns {Promise}
   */
  function () {
    return git.sgit.checkout([ERSCAFFOLD_BRANCH_NAME])
  }

git.commit =
  /**
   * Commits modifications
   * @returns {Promise}
   */
  function () {
    return git.sgit.commit(COMMIT_MESSAGE, '.')
  }

git.rollbackToFirstCommit =
  /**
   * Rolls back to the first commit
   * @returns {Promise}
   */
  function () {
    return git.sgit.log(['--first-parent']).then(summary => {
      const lastHash = summary.all[summary.length - 1].hash
      return git.sgit.revert(lastHash)
    })
  }
