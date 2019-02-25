import gitWrapper from './wrappers/git';
import fsPromisesWrapper from './wrappers/fsp';

class Generator {
  /**
   * @param {gitWrapper} git
   * @returns {Promise}
   */
  static _prepareGit(git) {
    return git
      .hasERBranch()
      .then(answer => {
        if (answer == true) {
          return git.checkoutERBranch();
        }
        return git.createAndCheckoutERBranch();
      })
      .then(() => git.rollbackToFirstCommit());
  }

  /**
   * @param {gitWrapper} git
   * @returns {Promise}
   */
  static _finalizeGit(git) {
    return git.commit();
  }

  /**
   *
   * @param {Object} template
   * @param {Object} template.meta
   * @param {Object|undefined} template.meta.creates
   * @param {string} template.meta.creates.fileName
   * @param {Object|undefined} template.meta.extends
   * @param {string} template.meta.extends.fileName
   * @param {string} template.meta.extends.section
   * @param {string} template.meta.extends.place can be "after", "before", "replace"
   * @param {integer} template.meta.order the execution order
   * @param {string} template.template_out the compiled template
   * @param {fsPromisesWrapper} fsp
   * @returns {Promise}
   */
  static _processRequest(template, fsp) {
    console.log(template);
    if (template.meta.creates) {
      // create a file
      const fileName = template.meta.creates.fileName;
      const content = template.template_out;
      fsp.createFile(fileName, content);
    }

    if (template.meta.extends) {
      // modify the file
      const fileName = template.meta.extends.fileName;
      const content = template.template_out;
      const place = template.meta.extends.place;
      const section = template.meta.extends.section;

      fsp.modifyFile(fileName, content, old => {
        if (place == 'replace') return old.replace(section, content);
        if (place == 'after') old.indexOf();
      });
    }
  }

  static _createModifications(templates) {
    templates.forEach(template => {
      this._processRequest(template);
    });
  }

  /**
   *
   * @param {*} templates
   * @returns {Promise}
   */
  static generate(templates, gitWrapper, fsPromisesWrapper) {
    this._prepareGit(gitWrapper);
    this._createModifications(templates, fsPromisesWrapper);
    this._finalizeGit(gitWrapper);
    return new Promise(res => res(true));
  }
}

export default Generator;
