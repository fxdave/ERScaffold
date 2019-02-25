import FastEJS from 'fastejs';
import path from 'path';
import fsp from './wrappers/fsp';
import PACKS_FOLDER_URL from './meta/PACKS_FOLDER_URL';
import Formatter from './Formatter';

FastEJS.settings.returns = '[__out, meta]';

class TemplateUtil {
  constructor() {
    this.rendered = [];
  }

  /**
   * renders the template and its children
   *
   * @param {string} pack the directory name of the pack
   * @param {string} template the template file url relative to the pack root
   * @param {Object} data the required params for render the template
   * @param {string} APPNAME the name of the new application
   * @returns {Promise}
   */
  static getTemplate(pack, template, data, APPNAME) {
    return fsp
      .getFileContent(path.join(PACKS_FOLDER_URL, pack, template))
      .then(
        cont =>
          new Promise((resolve, reject) => {
            // Dependecies:
            data.Formatter = Formatter;
            data.APPNAME = APPNAME;

            const out = FastEJS.parse(cont, data);
            const template_out = out[0];
            const meta = out[1];
            resolve({
              meta,
              template_out
            });
          })
      )
      .then(
        temp =>
          new Promise((resolve, reject) => {
            if (temp.meta.depends_on) {
              Promise.all(
                temp.meta.depends_on.map(dep =>
                  TemplateUtil.getTemplate(
                    pack,
                    path.join(path.dirname(template), dep.template),
                    dep.data,
                    APPNAME
                  )
                )
              )
                .then(deps => {
                  temp.meta.depends_on = deps;
                  resolve(temp);
                })
                .catch(err => {
                  reject(err);
                });
            } else {
              resolve(temp);
            }
          })
      )
      .catch(err => {
        console.error(err, pack, template, data, APPNAME);
      });
  }
}

export default TemplateUtil;
