import assert from 'assert'
import ERGitter from './ERGitter'


describe("ERGitter test", () => {
    
    let gitWrapper = {
       	async isGitInstalled() {},
        async isItGitRepository() {},
    	async isTreeClean() {},
        async hasBranch() {},
        async checkout() {},
        async revert() {},
    	async getLastCommitID() {},
    	async add() {},
        async commit() {}
    }

    it("tests basics", async done => {
        let eRGitter = new ERGitter({
        	...gitWrapper,
        	isGitInstalled: async () => true,
        	isItGitRepository: async () => true,
			isTreeClean: async () => true,
        	hasBranch: async () => true,
        })
    	await eRGitter.prepare()
    	await eRGitter.finalize()
    	assert.ok(true)
    	done()
    })

    it("tests GitIsNotInstalledError exception", async done => {
        let eRGitter = new ERGitter({
        	...gitWrapper,
        	isGitInstalled: async () => false,
        	isItGitRepository: async () => true,
			isTreeClean: async () => true,
        	hasBranch: async () => true,
        })

        try {
    		await eRGitter.prepare()
    	} catch(e) {
    		assert.ok(e instanceof ERGitter.GitIsNotInstalledError)
    	}

    	done()
    })

    it("tests NotInGitRepositoryError exception", async done => {
        let eRGitter = new ERGitter({
        	...gitWrapper,
        	isGitInstalled: async () => true,
        	isItGitRepository: async () => false,
			isTreeClean: async () => true,
        	hasBranch: async () => true,
        })

        try {
    		await eRGitter.prepare()
    	} catch(e) {
    		assert.ok(e instanceof ERGitter.NotInGitRepositoryError)
    	}

    	done()
    })

    it("tests GitTreeIsNotCleanError exception", async done => {
        let eRGitter = new ERGitter({
        	...gitWrapper,
        	isGitInstalled: async () => true,
        	isItGitRepository: async () => true,
			isTreeClean: async () => false,
        	hasBranch: async () => true,
        })

        try {
    		await eRGitter.prepare()
    	} catch(e) {
    		assert.ok(e instanceof ERGitter.GitTreeIsNotCleanError)
    	}

    	done()
    })

})