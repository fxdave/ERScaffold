import Generator from './Generator'
import assert from 'assert'
import RenderedTemplate from '../../Model/RenderedTemplate'
import TemplateSettings from '../../Model/TemplateSettings'

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

    let fsWrapperCopy = { ...fsWrapper }

    function reset() {
        fsWrapper = { ...fsWrapperCopy }

        fsWrapperCreateFile = false
        fsWrapperCreateFileCalled = {}
        fsWrapperModifyFile = false
        fsWrapperModifyFileCalled = {}
        fsWrapperModifyFileReturned = null
    }

    let templatePath = '/asd.txt'
    let templateContent = 'hello'

    it('should extend a file', async done => {
        reset()

        let generator = new Generator(fsWrapper)
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
