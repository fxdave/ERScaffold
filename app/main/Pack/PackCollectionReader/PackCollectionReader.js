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
     * @returns {Pack[]}
     */
    async getPacks(folder) {
        let packs = await this.fsWrapper.ls(folder)
        return await Promise.all(
            packs.map(pack => this.packReader.getPack(pack))
        )
    }
}

export default PackCollectionReader