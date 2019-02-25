import pluralize from 'pluralize';

class NameFormatter {
  /**
   * Tokenizes the given string
   * @param {string} what
   * @returns {string[]} tokens
   */
  getTags(what) {
    const regex = /[A-Z]?[a-z]+|[A-Z]/g;
    let m;
    const tags = [];
    while ((m = regex.exec(what)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        // console.log(`Found match, group ${groupIndex}: ${match}`)
        tags.push(match);
      });
    }

    return tags;
  }

  /**
   *
   * @param {string} what
   * @returns {string} the given string in UpperCamelCase
   */
  upperCamelCase(what) {
    return Formatter.getTags(what)
      .map(tag => {
        const splitted = tag.split('');
        splitted[0] = splitted[0].toUpperCase();
        return splitted.join('');
      })
      .join('');
  }

  /**
   *
   * @param {string} what
   * @returns {string} the given string in lowerCamelCase
   */
  lowerCamelCase(what) {
    let first = true;
    return Formatter.getTags(what)
      .map(tag => {
        const splitted = tag.split('');

        if (first) {
          first = false;
          splitted[0] = splitted[0].toLowerCase();
        } else {
          splitted[0] = splitted[0].toUpperCase();
        }

        return splitted.join('');
      })
      .join('');
  }

  /**
   *
   * @param {string} what
   * @returns {string} The given string in snake_case
   */
  snakeCase(what) {
    return Formatter.getTags(what)
      .map(tag => tag.toLowerCase())
      .join('_');
  }

  /**
   *
   * @param {string} what
   * @returns {string} the given string in kebab-case
   */
  kebabCase(what) {
    return Formatter.getTags(what)
      .map(tag => tag.toLowerCase())
      .join('-');
  }

  /**
   *
   * @param {string} what
   * @returns {string} the given string with the last tag in plural form
   */
  plural(what) {
    const tags = this.getTags(what);
    return what.replace(
      tags[tags.length - 1],
      pluralize.plural(tags[tags.length - 1]),
      what
    );
  }

  /**
   *
   * @param {string} what
   * @returns {string} the given string with the last tag in singular form
   */
  singular(what) {
    const tags = this.getTags(what);
    return what.replace(
      tags[tags.length - 1],
      pluralize.singular(tags[tags.length - 1]),
      what
    );
  }

  /**
   *
   * @param {string} what
   * @returns {string} the given string in "Normal form"
   */
  upperNormal(what) {
    const tags = this.getTags(what).map(tag => tag.toLowerCase());
    const tagsFirstSplit = tags[0].split();
    tagsFirstSplit[0] = tagsFirstSplit[0].toUpperCase();
    tags[0] = tagsFirstSplit.join('');
    return tags.join(' ');
  }

  /**
   * provides a simplier form for upperNormal
   * @param {string} what
   * @returns {string} the given string in "Normal form"
   */
  normal(what) {
    return this.upperNormal(what);
  }

  /**
   *
   * @param {string} what
   * @returns {string} the given string in "normal form"
   */
  lowerNormal(what) {
    const tags = this.getTags(what).map(tag => tag.toLowerCase());
    return tags.join(' ');
  }
}

export default new NameFormatter();
