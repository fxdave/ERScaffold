import Generator from './Generator'
import assert from 'assert'
import RenderedTemplate from '../../Model/RenderedTemplate'
import TemplateSettings from '../../Model/TemplateSettings'

describe('Generator test', () => {

    let fsWrapperCreateFile = false
	let fsWrapperCreateFileCalled= {}
    let fsWrapperModifyFile= false
    let fsWrapperModifyFileCalled = {}
    let fsWrapperModifyFileReturned = null
	let fsWrapper = {
		async createFile (path, content) {
            fsWrapperCreateFile = true
			fsWrapperCreateFileCalled = { path, content }
		},
		async modifyFile (path, callback) {
            fsWrapperModifyFile = true
            fsWrapperModifyFileCalled = {path, content, callback}
            fsWrapperModifyFileReturned = callback('old section_to_replace old')
		}
	}

	let gitWrapperCheckoutERBranch =  false
	let gitWrapperCreateAndCheckoutERBranch =  false
	let gitWrapperRollbackToFirstCommit =  false
	let gitWrapperCommit =  false
	let gitWrapperHasERBranch =  false
	let gitWrapper = {
		async hasERBranch () {
			gitWrapperHasERBranch = true
			return true
		},
		async checkoutERBranch () {
			gitWrapperCheckoutERBranch = true
			return true
		},
		async createAndCheckoutERBranch () {
			gitWrapperCreateAndCheckoutERBranch = true
			return true
		},
		async rollbackToFirstCommit () {
			gitWrapperRollbackToFirstCommit = true
			return true
		},
		async commit () {
			gitWrapperCommit = true
			return true
		}
	}

	let gitWrapperCopy = {...gitWrapper}
	let fsWrapperCopy = {...fsWrapper}
	function reset() {
		gitWrapper = {...gitWrapperCopy}
		fsWrapper = {...fsWrapperCopy}
		gitWrapperCheckoutERBranch =  false
		gitWrapperCreateAndCheckoutERBranch =  false
		gitWrapperRollbackToFirstCommit =  false
		gitWrapperCommit =  false
        gitWrapperHasERBranch =  false
        
        fsWrapperCreateFile = false
	    fsWrapperCreateFileCalled= {}
        fsWrapperModifyFile= false
        fsWrapperModifyFileCalled = {}
        fsWrapperModifyFileReturned = null
	}

	let templatePath = '/asd.txt'
	let templateContent = 'hello'

	it("shouldn't create new branch, and shouldn't modify any files", async done => {
		reset()

		let generator = new Generator(fsWrapper, gitWrapper)
		let templateSettings = new TemplateSettings('creates', templatePath)
		let template = new RenderedTemplate(templateSettings, templateContent)

		await generator.generate([template])

		// check if the git has handled well
		assert.ok(gitWrapperHasERBranch, 'hasERBranch should be called')
		assert.ok(gitWrapperCheckoutERBranch, 'checkoutERBranch should be called')
		assert.ok(!gitWrapperCreateAndCheckoutERBranch, "createAndCheckoutERBranch shouldn't be called")
		assert.ok(gitWrapperRollbackToFirstCommit, 'rollbackToFirstCommit should be called')
		assert.ok(gitWrapperCommit, 'commit should be called')

		// check if the file has created well
		assert.equal(fsWrapperCreateFileCalled.path, templatePath)
		assert.equal(fsWrapperCreateFileCalled.content, templateContent)
		assert.ok(!fsWrapperModifyFile, "ModifyFile shouldn't be called")

		done()
	})

	it("should create new git branch", async done => {
		reset()

		gitWrapper= {
			...gitWrapper,
			async hasERBranch () {
				gitWrapperHasERBranch = true
				return false
			},
		}

		let generator = new Generator(fsWrapper, gitWrapper)
		let templateSettings = new TemplateSettings('creates', templatePath)
		let template = new RenderedTemplate(templateSettings, templateContent)

		await generator.generate([template])

		// check if the git has handled well
		assert.ok(gitWrapperHasERBranch, 'hasERBranch should be called')
		assert.ok(!gitWrapperCheckoutERBranch, 'checkoutERBranch shouldn\'t be called')
		assert.ok(gitWrapperCreateAndCheckoutERBranch, "createAndCheckoutERBranch should be called")
		assert.ok(gitWrapperRollbackToFirstCommit, 'rollbackToFirstCommit should be called')
		assert.ok(gitWrapperCommit, 'commit should be called')

		// check if the file has created well
		assert.equal(fsWrapperCreateFileCalled.path, templatePath)
		assert.equal(fsWrapperCreateFileCalled.content, templateContent)
		assert.ok(!fsWrapperModifyFile, "ModifyFile shouldn't be called")

		done()
    })
    
	it("should extend a file", async done => {
		reset()

		let generator = new Generator(fsWrapper, gitWrapper)
		let templateSettings = new TemplateSettings('extends', templatePath, 'section-to-replace', 'replace')
		let template = new RenderedTemplate(templateSettings, templateContent)

		await generator.generate([template])

		// check if the git has handled well
		assert.ok(gitWrapperHasERBranch, 'hasERBranch should be called')
		assert.ok(gitWrapperCheckoutERBranch, 'checkoutERBranch should be called')
		assert.ok(!gitWrapperCreateAndCheckoutERBranch, "createAndCheckoutERBranch shouldn't be called")
		assert.ok(gitWrapperRollbackToFirstCommit, 'rollbackToFirstCommit should be called')
		assert.ok(gitWrapperCommit, 'commit should be called')

		// check if the file has created well
		assert.ok(!fsWrapperCreateFile, "shouldn't be called")
		assert.ok(fsWrapperModifyFile, "should be called")
		assert.ok(fsWrapperModifyFileCalled.path, templatePath)
		assert.ok(fsWrapperModifyFileCalled.content, templateContent)
		assert.ok(fsWrapperModifyFileReturned, 'old '+templateContent+' old')

		done()
	})
})