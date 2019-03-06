import assert from 'assert'
import RequirementReader from './RequirementReader'
import path from 'path'
import Pack from '../../Model/Pack'
import RequirementCollection from '../../Model/RequirementCollection';

describe("Requirement Reader", () => {

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

    it("read a requirement", async (done) => {
        let reqReader = new RequirementReader(fsWrapper)
        let req = await reqReader.getRequirement("resource_new.requirement.js")
        assert.equal(req.name, 'Create new resource')
        assert.equal(req.children[0].name, 'Go back button')
        done()
    })
})