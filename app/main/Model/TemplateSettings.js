class TemplateSettings {
  /**
   *
   * @param {string} mode can be, creates, extends
   * @param {string} path where to place the file
   * @param {string|RegExp} section the section of the extendable file
   * @param {string} place the placing mode can be: after,before,replace
   */
  constructor(mode, path, section, place) {
    this.mode = mode;
    this.path = path;
    this.section = section;
    this.place = place;
  }
}

export default TemplateSettings;
