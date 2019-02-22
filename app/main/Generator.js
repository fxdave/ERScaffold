import git from './wrappers/git';
import fsp from './wrappers/fsp';

class Generator {
  /**
   * @returns {Promise}
   */
  static prepareGit() {
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
   * @returns {Promise}
   */
  static finalizeGit() {
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
   * @returns {Promise}
   */
  static processRequest(template) {
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

  static createModifications(templates) {
    templates.forEach(template => {
      this.processRequest(template);
    });
  }

  /**
   *
   * @param {*} templates
   * @returns {Promise}
   */
  static generate(templates) {
    this.prepareGit();
    this.createModifications(templates);
    this.finalizeGit();
    return new Promise(res => res(true));
  }
}

export default Generator;
