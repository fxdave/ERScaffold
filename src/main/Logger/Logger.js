class Logger {

    /**
     *
     * @param {string} moduleName
     */
    constructor(moduleName) {
        this.moduleName = moduleName
    }

    /**
     * verbosity level 0
     * @param {any} arg1
     * @param {any} arg2...
     */
    log() {

        console.log(this.moduleName + ':', ...arguments)
    }

    /**
     * verbosity level 1
     * @param {any} arg1
     * @param {any} arg2...
     */
    _log() {

        console.log(this.moduleName + ':', ...arguments)
    }

    /**
     * verbosity level 2
     * @param {any} arg1
     * @param {any} arg2...
     */
    __log() {

        console.log(this.moduleName + ':', ...arguments)
    }


}

export default Logger