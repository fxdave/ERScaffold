class Exporter {
    /**
     * 
     * @param {FsWrapper} fsWrapper 
     */
    constructor(fsWrapper) {
        this.fsWrapper = fsWrapper
    }

    /**
     * 
     * @param {Object} data the ERModel
     * @param {string} as the path
     * @returns {boolean} error 
     */
    async export(data, as) {
        return await this.fsWrapper.createFile(
            as,
            JSON.stringify(data)
        )
    }
}

export default Exporter