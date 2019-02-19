import { promises as fsp } from 'fs'

fsp.getFileContent = 

/**
 * resolves the symbolic links then reads the file
 * @param {string} url 
 * @returns {Promise}
 */
function (url) {

    return fsp.realpath(url)
        .then((realurl) => new Promise((resolve, reject) => {
            fsp.access(realurl)
                .then(function () {
                    resolve(realurl)
                })
                .catch(function (err) {
                    reject(err)
                })
        }))
        .then((realurl) => fsp.readFile(realurl, 'utf8'))
}

/**
 * 
 * @param {string} source the source code
 * @param {string} output what to give back (which variable)
 * @param {Object} vars what should we define first
 * @returns {any}
 */
function getOutputFromSource(source, output, vars = {}) {

    try {
        return (new Function(source + '\n' + output))(...vars)
    } catch (err) {
        console.error(err);
        return null
    }
}

fsp.getScript = 

/**
 * reads a file then executes it with the given output string
 * @param {string} url to the js script 
 * @param {string} output what to give back (which variable)
 * @returns {Promise}
 */
function (url, output) {

    return new Promise((resolve, reject) => {
        console.log("Getting script:", url);

        fsp.getFileContent(url)
            .then(file => {
                resolve(getOutputFromSource(file, output))
            })
            .catch(error => {
                console.error(error);
                resolve(null)
            })

    })
}


fsp.ls = 

/**
 * resolves symbolic links then reads the given dir
 * @param {string} path 
 * @returns {Promise}
 */
function (path) {

    return fsp.realpath(path)
        .then(realurl => {
            return fsp.readdir(realurl)
        })
}

export default fsp