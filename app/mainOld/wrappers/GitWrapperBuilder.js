const gitP = require('simple-git/promise')
const process = require('process')
const git = require('./GitWrapper')

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

export default function (workdir) {
  git.sgit = gitP(workdir)
  return git
}
