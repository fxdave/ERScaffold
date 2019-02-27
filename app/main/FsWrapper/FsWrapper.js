import { promises as fsp } from 'fs'
import glob from 'glob'
/**
 * Wraps the filesystem utilities to provide a better interface
 */
class FsWrapper {
    /**
     * resolves the symbolic links then reads the file
     * @async
     * @param {string} url
     * @returns {string}
     */
    async getFileContent(url) {
        let realpath = await fsp.realpath(path)
        let file = await fsp.readFile(realpath, 'utf8')
        return file
    }

    /**
     *
     * @param {string} source the source code
     * @param {string} output what to give back (which variable)
     * @param {Object} vars what should we define first
     * @returns {any}
     */
    _getOutputFromSource(source, output, vars = {}) {
        try {
            const out = new Function(
                ...Object.keys(vars),
                `${source}\n return ${output}`
            )(...Object.values(vars))
            console.log(out)

            return out
        } catch (err) {
            console.error(err)
            return null
        }
    }

    /**
     * reads a file then executes it with the given output string
     * @async
     * @param {string} url to the js script
     * @param {string} output what to give back (which variable)
     * @returns {any}
     */
    async getScript(url, output) {
        let file = await fsp.getFileContent(url)
        return _getOutputFromSource(file, output)
    }

    /**
     * resolves symbolic links then reads the given dir
     * @async
     * @param {string} path
     * @returns {string[]}
     */
    async ls(path) {
        let realpath = await fsp.realpath(path)
        let dir = await fsp.readdir(realpath)
        return dir
    }

    /**
     * @asnyc
     * @param {string} path
     * @returns {string[]} 
     */
    glob(path) {
        glob('**/*.js', options, function (er, files) {
            // files is an array of filenames.
            // If the `nonull` option is set, and nothing
            // was found, then files is ["**/*.js"]
            // er is an error object or null.
        })
    }
}

export default FsWrapper
