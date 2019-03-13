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
    }

    async prepare() {
        let gitInstalled = await this.gitWrapper.isGitInstalled()
        let gitRepository = await this.gitWrapper.isItGitRepository()
        let cleanTree = await this.gitWrapper.isTreeClean()
        
        if(!gitInstalled) throw new GitIsNotInstalledError()
        if(!gitRepository) throw new NotInGitRepositoryError()
        if(!cleanTree) throw new GitTreeIsNotCleanError()

        let hasERBranch = await this.gitWrapper.hasBranch('ERBranch')
        
        await this.gitWrapper.checkout('ERBranch', !hasERBranch)
        
        if(hasERBranch)
            await this.gitWrapper.revert(await this.gitWrapper.getLastCommitID())
         
    }

    async finalize() {
        await this.gitWrapper.add('.')
        await this.gitWrapper.commit('ERScaffold generated the files')
    }
}

ERGitter.GitIsNotInstalledError = GitIsNotInstalledError
ERGitter.NotInGitRepositoryError = NotInGitRepositoryError
ERGitter.GitTreeIsNotCleanError = GitTreeIsNotCleanError
export default ERGitter