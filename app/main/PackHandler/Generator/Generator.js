class Generator {
  /**
   *
   * @param {FsWrapper} fsWrapper
   */
  constructor(fsWrapper, gitWrapper) {
    this.fsWrapper = fsWrapper;
    this.gitWrapper = gitWrapper;
  }

  /**
   * checks out to ER branch
   *
   * @param {gitWrapper} git
   * @returns {Promise}
   */
  _prepareGit() {
    return this.gitWrapper
      .hasERBranch()
      .then(answer => {
        if (answer == true) {
          return this.gitWrapper.checkoutERBranch();
        }
        return this.gitWrapper.createAndCheckoutERBranch();
      })
      .then(() => this.gitWrapper.rollbackToFirstCommit());
  }

  /**
   * @param {gitWrapper} git
   * @returns {Promise}
   */
  _finalizeGit() {
    return this.gitWrapper.commit();
  }

  /**
   *
   * @async
   * @param {RenderedTemplate} template
   * @returns {any}
   */
  async _processModification(template) {
    let templateMode = template.templateSettings.mode;

    if (templateMode === 'creates') {
      // Creates a new file on the desired path
      const path = template.templateSettings.path;
      const content = template.content;
      return await this.fsWrapper.createFile(path, content);
    }

    if (templateMode === 'extends') {
      // modify the file
      const path = template.templateSettings.path;
      const content = template.content;
      const place = template.templateSettings.place;
      const section = template.templateSettings.section;

      return await this.fsWrapper.modifyFile(path, content, old => {
        if (place == 'replace') return old.replace(section, content);
        if (place == 'after') return old.replace(section, section + content);
        if (place == 'before') return old.replace(section, content + section);
      });
    }
  }

  /**
   * @asnyc
   * @param {RenderedTemplate[]} templates
   * @returns {any[]}
   */
  async _createModifications(templates) {
    return await Promise.all(
      templates.map(template => {
        this._processModification(template);
      })
    );
  }

  /**
   * @async
   * @param {RenderedTemplate[]} templates
   * @returns {boolean}
   */
  async generate(templates) {
    await this._prepareGit();
    await this._createModifications(templates);
    await this._finalizeGit();
    return true;
  }
}

export default Generator;
