import assert from 'assert'
import TemplateUtil from './TemplateUtil';
import Entity from './model/Entity';

describe('PackUtil', function () {
    describe('get template', function () {
        it('test1', function (done) {
            TemplateUtil.getTemplate("BASIC_PHOENIX","./model/schema.template.ejs",{entity: new Entity(1,"Music",[])},"MusicTeam")
            .then(cont => {
                console.log(cont);
                
                assert.ok(true)
                done()
            }).catch(err => {
                console.error(err);
                
                assert.ok(false)
                done()
            })
        })
    })

})