ha nincs git -> error
ha nem git repo -> error
ha dirty a working tree -> error

ha nincs ERBranch:	
	git checkout -b ERBranch

ha van ERBranch:
	git checkout ERBranch
	git revert előző_commit

fájlok generálása
git add .
git commit -m "ER generated"

class GitWrapper {
	constructor(workdir: string) {}
	asnyc isGitInstalled() : boolean {}
	asnyc isItGitRepository() : boolean {}
	asnyc isTreeClean() : boolean {}
	asnyc hasBranch(branchname : string) : boolean {}
	asnyc checkout(branchname : string, create? : boolean) {}
	async revert(commit_id : string) {}
	async addAllModifications() {}
	async commit(message : string) {}
}

clas ERGitter {
	constructor(GitWrapper) {}
	async prepare() {}
	async finalize() {}
}
