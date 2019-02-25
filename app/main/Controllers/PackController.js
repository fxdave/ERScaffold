import Controller from './Controller';
import Model from '../Model/Model';

class PackageListItem {
  constructor(id, name, packs) {
    this.entity = {
      id,
      name
    };

    this.packs = packs;
  }
}

class PackController extends Controller {
  /**
   *
   * @param {PackHandler} packHandler
   */
  constructor(packHandler) {
    super();
    this.model = null;
    this.packHandler = packHandler;
  }

  /**
   * @async
   * @param {Object} e
   * @param {Object} model the ERModel
   * @returns {PackageListItem[]|...{success, msg}}
   */
  async listPackages(e, model) {
    try {
      this.model = new Model(model);

      let options = await this.packHandler.getOptionsForEntities(
        this.model.getEntities()
      );

      return options.map(
        ({ entity, packs }) =>
          new PackageListItem(entity.id, entity.name, packs)
      );
    } catch (error) {
      return {
        success: false,
        msg: "Sorry couldn't fetch the pack, details:" + error
      };
    }
  }

  /**
   *
   * @param {Object} e
   * @param {Object[]} data the selected templates
   */
  async generateSelectedPackages(e, data) {
    this.model.getEntities().forEach(async entity => {
      let templates = await Promise.all(
        data.map(template =>
          this.packHandler.templateReader.getTemplate(
            template.pack,
            template.template,
            { entity }
          )
        )
      );

      this.packHandler.generate(templates);

      return { succcess: true, msg: 'Sorry this is not implemented yet' };
    });
  }
}

export default PackController;
