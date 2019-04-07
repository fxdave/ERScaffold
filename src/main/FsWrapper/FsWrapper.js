import { promises as fsp, existsSync, mkdirSync } from "fs";
import glob from "glob";
import path from "path";
import mkdirp from "mkdirp";
import Logger from "../Logger/Logger";

/**
 * Wraps the filesystem utilities to provide a better interface
 */
class FsWrapper {
  constructor() {
    this.logger = new Logger("FsWrapper");
  }
  /**
   * resolves the symbolic links then reads the file
   * @async
   * @param {string} path
   * @returns {string}
   */
  async getFileContent(path) {
    this.logger.log("Getting the file's content on: ", path);
    let realpath = await fsp.realpath(path);
    let file = await fsp.readFile(realpath, "utf8");
    return file;
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

      return out;
    } catch (err) {
      console.error(err);
      return null;
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
    let file = await this.getFileContent(url);
    this.logger.log(
      "Starting to execute the JS file on: ",
      url,
      "with watching output of:",
      output
    );
    return this._getOutputFromSource(file, output);
  }

  /**
   * resolves symbolic links then reads the given dir
   * @async
   * @param {string} path
   * @returns {string[]}
   */
  async ls(path) {
    let realpath = await fsp.realpath(path);
    this.logger.log("Reading directory: ", path);
    let dir = await fsp.readdir(realpath);
    return dir;
  }

  /**
   * @asnyc
   * @param {string} path
   * @returns {string[]}
   */
  async glob(path) {
    this.logger.log("Getting matching etries to: ", path);
    return await new Promise((resolve, reject) => {
      glob(path, function(er, files) {
        if (er) {
          reject(er);
        } else {
          resolve(files);
        }
      });
    });
  }

  /**
   *
   * @param filePath
   * @returns {Promise<void>}
   * @private
   */
  async _ensureDirectoryExistence(filePath) {
    this.logger.log("Ensuring directory existance on: ", filePath);
    let dirname = path.dirname(filePath);
    if (existsSync(dirname)) return;
    await this._ensureDirectoryExistence(dirname);
    this.logger.log("Creating directory: ", dirname);
    await mkdirSync(dirname);
  }

  /**
   * @async
   * @param {string} filePath
   * @param {string} content
   */
  async createFile(filePath, content, chmod) {
    await new Promise((resolve, reject) =>
      mkdirp(path.dirname(filePath), function(err) {
        if (err) reject(err);
        resolve(true);
      })
    );

    this.logger.log("Creating file: ", filePath);
    await fsp.writeFile(filePath, content, "utf8");

    if (chmod) {
      this.logger.log("Modifiing chmod to: ", chmod);
      await fsp.chmod(filePath, chmod);
    }
  }

  /**
   * @async
   * @param {string} path
   * @param {Function} callback
   */
  async modifyFile(path, callback) {
    let oldContent = await this.getFileContent(path);
    let newContent = callback(oldContent);
    this.logger.log("Starting to modify file :", path);

    await fsp.writeFile(path, newContent, "utf8");
  }
}

export default FsWrapper;
