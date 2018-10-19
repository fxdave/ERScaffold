import assert from 'assert'
import ModelCollection from './ModelCollection'

describe('ModelCollection', function () {
        let mc = new ModelCollection();
        it('add', function () {
            let obj = { valami : "asd"}
            let id = mc.add(obj)
            assert.equal(id, 0)
            id = mc.add(obj)
            assert.equal(id, 1)
            id = mc.add(obj)
            assert.equal(id, 2)
            assert.equal(obj.id, 2)
        })
        it('delete', function () {
            
            assert.equal(mc.storage.size, 3)
            mc.remove(1)
            assert.equal(mc.storage.size, 2)
        })
        it('get', function () {
            let got = mc.get(0)
            assert.equal(got.valami,"asd")
        })
        it('all', function () {
            let got = mc.all()
            if(got instanceof Array) {
                assert.equal(got.length,2)
                assert.ok(true)
            } else {
                assert.ok(false)
            }
        })
})