const gitP = require('simple-git/promise');
const process = require('process')
const ERSCAFFOLD_BRANCH_NAME = 'ERBranch';
const COMMIT_MESSAGE = 'ER model has generated';
const WORKDIR = process.cwd();
const sgit = gitP(WORKDIR);

sgit.checkIsRepo().then(isRepo => {});

/**
 * Procedure:
 * if has ERBranch
 *  checkout
 * else
 *  create and checkout
 * rollback to first commit in the branch
 * some modifications
 * commit
 *
 */
const git = {};

git.hasERBranch =
  /**
   * Checks if the ERScaffold branch is created or not
   * @returns {Promise} will be resolved with bool
   */
  function() {
    return new Promise((resolve, reject) => {
      sgit
        .branchLocal()
        .then(summary => {
          const interest = Object.keys(summary.branches).filter(
            name => name.indexOf(ERSCAFFOLD_BRANCH_NAME) != -1
          );
          resolve(interest.length == 1);
        })
        .catch(err => {
          resolve(false);
        });
    });
  };

git.createAndCheckoutERBranch =
  /**
   * Creates ERBranch from the current branch
   * @returns {Promise}
   */
  function() {
    return sgit.checkout(['-b', ERSCAFFOLD_BRANCH_NAME]);
  };

git.checkoutERBranch =
  /**
   * checkout to ERBranch
   * @returns {Promise}
   */
  function() {
    return sgit.checkout([ERSCAFFOLD_BRANCH_NAME]);
  };

git.commit =
  /**
   * Commits modifications
   * @returns {Promise}
   */
  function() {
    return sgit.commit(COMMIT_MESSAGE, '.');
  };

git.rollbackToFirstCommit =
  /**
   * Rolls back to the first commit
   * @returns {Promise}
   */
  function() {
    return sgit.log(['--first-parent']).then(summary => {
      const lastHash = summary.all[summary.length - 1].hash;
      return sgit.revert(lastHash);
    });
  };

export default git;
