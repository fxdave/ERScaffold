import Generator from './Generator'
import assert from 'assert'
import RenderedTemplate from '../../Model/RenderedTemplate'
import TemplateSettings from '../../Model/TemplateSettings'


class ERGitterMockUp {
    constructor() {
        this.finalizeCalled = false
        this.prepareCalled = false
    }

    async prepare() {
        this.finalizeCalled = true
    }

    async finalize() {
        this.prepareCalled = true
    }
}


describe('Generator test', () => {

    let fsWrapperCreateFile = false
    let fsWrapperCreateFileCalled = {}
    let fsWrapperModifyFile = false
    let fsWrapperModifyFileCalled = {}
    let fsWrapperModifyFileReturned = null
    let fsWrapper = {
        async createFile(path, content) {
            fsWrapperCreateFile = true
            fsWrapperCreateFileCalled = { path, content }
        },
        async modifyFile(path, callback) {
            fsWrapperModifyFile = true
            fsWrapperModifyFileCalled = { path, callback }
            fsWrapperModifyFileReturned = callback('old section_to_replace old')
        }
    }

    let eRGitter = new ERGitterMockUp()

    let fsWrapperCopy = { ...fsWrapper }

    function reset() {
        fsWrapper = { ...fsWrapperCopy }

        fsWrapperCreateFile = false
        fsWrapperCreateFileCalled = {}
        fsWrapperModifyFile = false
        fsWrapperModifyFileCalled = {}
        fsWrapperModifyFileReturned = null

        eRGitter.finalizeCalled = false
        eRGitter.prepareCalled = false
    }

    let templatePath = '/asd.txt'
    let templateContent = 'hello'

    it('shouldn\'t create new branch, and shouldn\'t modify any files', async done => {
        reset()

        let generator = new Generator(fsWrapper, eRGitter)
        let templateSettings = new TemplateSettings('creates', templatePath,undefined,undefined)
        let template = new RenderedTemplate(templateSettings, templateContent, [])

        await generator.generate([template])


        // check if the file has created well
        assert.equal(fsWrapperCreateFileCalled.content, templateContent)
        assert.ok(!fsWrapperModifyFile, 'ModifyFile shouldn\'t be called')

        done()
    })

    it('should create new git branch', async done => {
        reset()

        let generator = new Generator(fsWrapper, eRGitter)
        let templateSettings = new TemplateSettings('creates', templatePath)
        let template = new RenderedTemplate(templateSettings, templateContent, [])

        await generator.generate([template])

        // check if the file has created well
        assert.equal(fsWrapperCreateFileCalled.content, templateContent)
        assert.ok(!fsWrapperModifyFile, 'ModifyFile shouldn\'t be called')

        done()
    })

    it('should extend a file', async done => {
        reset()

        let generator = new Generator(fsWrapper, eRGitter)
        let templateSettings = new TemplateSettings('extends', templatePath, 'section-to-replace', 'replace')
        let template = new RenderedTemplate(templateSettings, templateContent,[])

        await generator.generate([template])

        // check if the file has created well
        assert.ok(!fsWrapperCreateFile, 'shouldn\'t be called')
        assert.ok(fsWrapperModifyFile, 'should be called')
        assert.ok(fsWrapperModifyFileReturned, 'old ' + templateContent + ' old')

        done()
    })
})
