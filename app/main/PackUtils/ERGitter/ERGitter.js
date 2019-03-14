import Logger from '../../Logger/Logger'
import process from 'process'

class GitIsNotInstalledError extends Error {
    constructor() { super('Git is not installed') }
}
class NotInGitRepositoryError extends Error {
    constructor() { super('You are not in a git repository') }
}
class GitTreeIsNotCleanError extends Error {
    constructor() { super('Git tree is not clean. Please stage all changes and commit them.') }
}

class ERGitter {
    
    /**
     * @param {GitWrapper} gitWrapper
     */
    constructor(gitWrapper) {
        this.gitWrapper = gitWrapper
        this.logger = new Logger('PackUtils\\ERGitter')
    }


    async prepare() {
        this.logger.log('Preparing git repository for modifications')
        this.logger.log('Working directory: ', process.cwd())

        let gitInstalled = await this.gitWrapper.isGitInstalled()
        let gitRepository = await this.gitWrapper.isItGitRepository()
        let cleanTree = await this.gitWrapper.isTreeClean()

        this.logger.log('Git is installed: ', gitInstalled)
        this.logger.log('This is a git repository: ', gitRepository)
        this.logger.log('Git tree is clean: ', cleanTree)
        
        if(!gitInstalled) throw new GitIsNotInstalledError()
        if(!gitRepository) throw new NotInGitRepositoryError()
        if(!cleanTree) throw new GitTreeIsNotCleanError()

        let hasERBranch = await this.gitWrapper.hasBranch('ERBranch')
        this.logger.log('Repository has ERBranch: ', hasERBranch)

        if(!hasERBranch) {
            this.logger.log('Creating and doing checkout to ERBranch')
            await this.gitWrapper.checkout('ERBranch', true)
        } else {
            this.logger.log('Checkout to ERBranch')
            await this.gitWrapper.checkout('ERBranch', false)
            this.logger.log('Reverting last ERBranch generation')
            await this.gitWrapper.revert(await this.gitWrapper.getLastCommitID())
        }
         
    }

    async finalize() {

        this.logger.log('Staging all changes')
        await this.gitWrapper.add('.')

        this.logger.log('Commiting changes')
        await this.gitWrapper.commit('ERScaffold generated the files')
    }
}

ERGitter.GitIsNotInstalledError = GitIsNotInstalledError
ERGitter.NotInGitRepositoryError = NotInGitRepositoryError
ERGitter.GitTreeIsNotCleanError = GitTreeIsNotCleanError
export default ERGitter