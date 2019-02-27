import PackController from './PackController'
import assert from 'assert'
import Pack from '../Model/Pack';
import RequirementCollection from '../Model/RequirementCollection';
import Requirement from '../Model/Requirement';
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
})