import assert from 'assert'
import PackUtil from './PackUtil'
import Entity from './model/Entity';


describe('PackUtil', function () {
    describe('get packs', function () {
        it('test1', function () {
            PackUtil.getPacks().then((packs) => {
                console.log(JSON.stringify(packs));
            }).catch(err => {
                console.error(err);
            })

        })
    })

    describe('get packs for entities', function () {
        it('test1', function () {
            PackUtil.getFilteredPacksForEntities([new Entity(1,"asd",[]), new Entity(2,"asd",[])]).then((packs) => {
                console.log(JSON.stringify(packs));
            }).catch(err => {
                console.error(err);
            })

        })
    })

})