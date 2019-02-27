import PackCollection from '../../Model/PackCollection'
import path from 'path'
/**
 * This class provides utilities with Packs
 */
class PackCollectionReader {

    /**
     * 
     * @async
     * @param {FsWrapper} fsWrapper 
     * @param {PackReader} packReader
     */
    constructor(fsWrapper, packReader) {
        this.fsWrapper = fsWrapper
        this.packReader = packReader
    }

    /**
     * @async
     * @param {string} folder The path where the packs can be found
     * @returns {PackCollection}
     */
    async getPacks(folder) {
        let packIndicesPath = path.join(folder, '/*/pack.index.js')
        let packIndices = await this.fsWrapper.glob(packIndicesPath)

        let packs = await Promise.all(
            packIndices.map(packIndex => this.packReader.getPack(packIndex))
        )

        return new PackCollection(...packs)
    }
}

export default PackCollectionReader