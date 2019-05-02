import PackController from './PackController'
import assert from 'assert'
import Pack from '../Model/Pack';
import RequirementCollection from '../Model/RequirementCollection';
import Requirement from '../Model/Requirement';
import ERModel from '../Model/ERModel';
import RenderedTemplate from '../Model/RenderedTemplate';
import TemplateSettings from '../Model/TemplateSettings';
import Exporter from '../Utils/Exporter'
describe('PackController test', () => {

    let eRGitter = {
        prepare() {},
        finalize() {}
    }

    it('tests listPackages', async (done) => {
        let packCollectionReader = {
            async getPacks(folder) {
                return [new Pack("TESTPACK",new RequirementCollection(
                    new Requirement("testRequirement",new RequirementCollection(),data => data)
                ))]
            }
        }
        let templateRenderer = {
            async renderTemplate(path,data) {
                
            }
        }
        let generator = {
            async generate(templates) {
                
            }
        }

        let requirementReader = {
            async getRequirement() {
                return new Requirement()
            }
        }


        let fsWrapper = {
            async createFile(path,content) {}
        }

        let exporter = new Exporter(fsWrapper)
        let packController = new PackController(packCollectionReader,templateRenderer,generator,requirementReader,exporter,eRGitter)
        let res = await packController.listPackages(null, {
            appName: 'TestApp',
            entities: [
                {id:1, name: 'Hello', props:[]}
            ],
            conns: []

        })
        
        assert.ok(res.success, res.msg)
        assert.ok(res.msg instanceof Array, res.msg)
        done()
    })

    it('tests generateSelectedPackages', async done => {
        let packCollectionReader = {
            async getPacks(folder) {
                return [new Pack("TESTPACK",new RequirementCollection(
                    new Requirement("testRequirement",new RequirementCollection(),data => data)
                ))]
            }
        }
        let templateRenderer = {
            async renderTemplate(path,data) {
                return new RenderedTemplate(new TemplateSettings('creates','/path/to/testTemplate'),'test')
            }
        }
        let generator = {
            async generate(templates) {
                assert.equal(templates[0].content,'test')
            }
        }

        let requirementReader = {
            async getRequirement() {
                return new Requirement("test req", new RequirementCollection(), data => data, '/path/to/req', '/path/to/template')
            }
        }

        let fsWrapper = {
            async createFile(path,content) {}
        }

        let exporter = new Exporter(fsWrapper)
        let packController = new PackController(packCollectionReader,templateRenderer,generator, requirementReader, exporter, eRGitter)
        packController.model = new ERModel({
            appName: 'TestApp',
            entities: [
                {id:1, name: 'Hello', props:[]}
            ],
            conns: []

        })

        let res = await packController.generateSelectedPackages(null, [
            '/path/to/testTemplate'
        ])
        assert.ok(res.success, res.msg)
        done()
    })
})