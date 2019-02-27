import PackCollectionReader from './PackCollectionReader'
import PackCollection from '../../Model/PackCollection'
import assert from 'assert'

describe("PackCollectionReader test", () => {
    let packs_folder = "/packs"
    let fsWrapper = {
        glob(p) {
            return [p.replace('*','PACK1')]
        }
    }
    let resultPack = "all fine"
    let packReader = {
        getPack(packIndex) {
            return resultPack
        }
    }
    it("should get the pack collection", async (done) => {
        let packCollectionReader = new PackCollectionReader(fsWrapper, packReader)
        let packs = await packCollectionReader.getPacks(packs_folder)
        
        assert.ok(packs instanceof PackCollection, 'packs should be a PackCollection')
        assert.equal(packs[0],resultPack)

        done()
    })
})