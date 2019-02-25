import { promises as fsp } from 'fs';

/**
 * Wraps the filesystem utilities to provide a better interface
 */
class FsWrapper {
  /**
   * resolves the symbolic links then reads the file
   * @param {string} url
   * @returns {Promise}
   */
  getFileContent(url) {
    return fsp
      .realpath(url)
      .then(
        realurl =>
          new Promise((resolve, reject) => {
            fsp
              .access(realurl)
              .then(() => {
                resolve(realurl);
              })
              .catch(err => {
                reject(err);
              });
          })
      )
      .then(realurl => fsp.readFile(realurl, 'utf8'));
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
      )(...Object.values(vars));
      console.log(out);

      return out;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /**
   * reads a file then executes it with the given output string
   * @param {string} url to the js script
   * @param {string} output what to give back (which variable)
   * @returns {Promise}
   */
  getScript(url, output) {
    return new Promise((resolve, reject) => {
      console.log('Getting script:', url);

      fsp
        .getFileContent(url)
        .then(file => {
          resolve(_getOutputFromSource(file, output));
        })
        .catch(error => {
          console.error(error);
          resolve(null);
        });
    });
  }

  /**
   * resolves symbolic links then reads the given dir
   * @param {string} path
   * @returns {Promise}
   */
  ls(path) {
    return fsp.realpath(path).then(realurl => fsp.readdir(realurl));
  }
}

export default FsWrapper;
