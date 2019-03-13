import { promises as fsp, existsSync, mkdirSync } from 'fs'
import glob from 'glob'
import path from 'path'
import mkdirp from 'mkdirp'
/**
 * Wraps the filesystem utilities to provide a better interface
 */
class FsWrapper {
    /**
   * resolves the symbolic links then reads the file
   * @async
   * @param {string} path
   * @returns {string}
   */
    async getFileContent(path) {
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
        let file = await this.getFileContent(url)
        return this._getOutputFromSource(file, output)
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
    async glob(path) {
        return await new Promise((resolve, reject) => {
            glob(path, function(er, files) {
                if (er) {
                    reject(er)
                } else {
                    resolve(files)
                }
            })
        })
    }

    /**
     *
     * @param filePath
     * @returns {Promise<void>}
     * @private
     */
    async _ensureDirectoryExistence(filePath) {
        let dirname = path.dirname(filePath)
        if ( existsSync(dirname)) return
        await this._ensureDirectoryExistence(dirname)
        await mkdirSync(dirname)
    }

    /**
   * @async
   * @param {string} filePath
   * @param {string} content
   */
    async createFile(filePath, content) {
        mkdirp(path.dirname(filePath),function(err) {
            if(err)
                console.error(err)
        })
        return await fsp.writeFile(filePath, content, 'utf8')
    }

    /**
   * @async
   * @param {string} path
   * @param {Function} callback
   */
    async modifyFile(path, callback) {
        let oldContent = await this.getFileContent(path)
        return await fsp.writeFile(path, callback(oldContent), 'utf8')
    }
}

export default FsWrapper
