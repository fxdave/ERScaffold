import PackController from './PackController'
import assert from 'assert'
import Pack from '../Model/Pack';
import RequirementCollection from '../Model/RequirementCollection';
import Requirement from '../Model/Requirement';
import ERModel from '../Model/ERModel';
import RenderedTemplate from '../Model/RenderedTemplate';
import TemplateSettings from '../Model/TemplateSettings';
describe('PackController test', () => {
    it('tests listPackages', async (done) => {
        let packCollectionReader = {
            async getPacks(folder) {
                return [new Pack("TESTPACK",new RequirementCollection(
                    new Requirement("testRequirement",[],data => data)
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

        let packController = new PackController(packCollectionReader,templateRenderer,generator)
        let res = await packController.listPackages(null, {
            appName: 'TestApp',
            entities: [
                {id:1, name: 'Hello', props:[]}
            ],
            conns: []

        })
        
        assert.ok(res instanceof Array)
        done()
    })

    it('tests generateSelectedPackages', async done => {
        let packCollectionReader = {
            async getPacks(folder) {
                return [new Pack("TESTPACK",new RequirementCollection(
                    new Requirement("testRequirement",[],data => data)
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

        let packController = new PackController(packCollectionReader,templateRenderer,generator)
        packController.model = new ERModel({
            appName: 'TestApp',
            entities: [
                {id:1, name: 'Hello', props:[]}
            ],
            conns: []

        })

        let res = await packController.generateSelectedPackages(null, [
            {pack: 'TESTPACK', template: '/path/to/testTemplate'}
        ])
        assert.ok(res.succcess)
        done()
    })
})