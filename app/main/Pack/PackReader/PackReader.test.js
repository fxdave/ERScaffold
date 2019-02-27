import assert from 'assert'
import PackReader from './PackReader'
import path from 'path'
import Pack from '../../Model/Pack'
import RequirementCollection from '../../Model/RequirementCollection';

describe("Pack Reader", () => {

    let fileOutputs = {
        'index.pack.js' : {
            name: 'Basic Phoenix',
            requirements: [
              {
                file: 'resource_new.requirement.js',
              }
            ]
          },
          'resource_new.requirement.js': {
            name: 'Create new resource',
            template: './template/new.template.ejs',
            data(entity) {
              return entity;
            },
            children: [{ file: 'resource_new_go_back_button.requirement.js' }]
          },
          'resource_new_go_back_button.requirement.js':  {
            name: 'Go back button',
            template: './template/new_go_back.template.ejs',
            data(entity) {
              return entity;
            }
          }
    }

    let fsWrapper = {
        async getScript(file, out) {
            return await fileOutputs[path.basename(file)]
        }
    }

    it("should get a pack", async (done) => {
        let packReader = new PackReader(fsWrapper)
        let pack = await packReader.getPack('/something/index.pack.js')

        assert.ok(pack instanceof Pack)
        assert.equal(pack.name, 'Basic Phoenix')
        assert.ok(pack.requirementCollection instanceof RequirementCollection)
        assert.equal(pack.requirementCollection.length, 1)
        assert.equal(pack.requirementCollection[0].name, 'Create new resource')
        assert.ok(pack.requirementCollection[0].children instanceof RequirementCollection)
        assert.equal(pack.requirementCollection[0].children[0].name, 'Go back button')

        done()
    })
})