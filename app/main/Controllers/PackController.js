import os from 'os'
import Controller from './Controller'
import ERModel from '../Model/ERModel'
import PackCollection from '../Model/PackCollection'
import Pack from '../Model/Pack'
import PackCollectionReader from '../PackUtils/PackCollectionReader/PackCollectionReader'
import TemplateRenderer from '../PackUtils/TemplateRenderer/TemplateRenderer'
import Generator from '../PackUtils/Generator/Generator'
import path from 'path'
class PackageListItem {
    constructor(id, name, packs) {
        this.entity = {
            id,
            name
        }

        this.packs = packs
    }
}

class PackController extends Controller {
    /**
     *
     * @param {PackCollectionReader} packCollectionReader
     * @param {TemplateRenderer} templateRenderer
     * @param {Generator} generator
     */
    constructor(packCollectionReader, templateRenderer, generator) {
        super()
        this.model = null
        this.packCollectionReader = packCollectionReader
        this.templateRenderer = templateRenderer
        this.generator = generator
    }

    /**
     * @asnyc
     * @returns {Pack[]}
     */
    async _getUserPacks() {
        /*
        try {
            let packsFolderUser = `${os.homedir()}/.config/erscaffold/packs`
            return await this.packCollectionReader.getPacks(packsFolderUser)
        } catch {
            return []
        }
        */
        return [] // TODO: implement it well 
    }

    /**
     * @async
     * @param {Object} e
     * @param {Object} model the ERModel
     * @returns {PackageListItem[]|...{success, msg}}
     */
    async listPackages(e, model) {
        try {
            this.model = new ERModel(model)

            // getting builtin packs
            let packsFolderBuiltin = path.join(__dirname, '../../../packs')
            let packsBuiltin = await this.packCollectionReader.getPacks(packsFolderBuiltin)

            // getting user packs
            let packsUser = await this._getUserPacks()
            
            // get all packs together
            let packs = new PackCollection(...packsBuiltin,...packsUser)

            // and filter out which requirement is allowed for that model
            let options = packs.getOptionsForEntities(this.model.getEntities())

            return options.map(
                ({ entity, packs }) =>
                    new PackageListItem(entity.id, entity.name, packs)
            )
        } catch (error) {
            return {
                success: false,
                msg: 'Sorry couldn\'t fetch the pack, details:' + error
            }
        }
    }

    /**
     *
     * @param {Object} e
     * @param {Object[]} data the selected templates
     * @param {string} data[].pack the name of the packfolder
     * @param {string} data[].template the path of the templatefile
     */
    async generateSelectedPackages(e, data) {
        try {
            let entities = this.model.getEntities()
            await Promise.all(entities.map(async entity => {
                
                let templates = await Promise.all(
                    data.map(template =>
                        this.templateRenderer.renderTemplate(
                            path.join(template.pack, template.template),
                            { entity }
                        )
                    )
                )

                return await this.generator.generate(templates)

            }))
            return { succcess: true }
        } catch(e) {
            return { succcess: false, msg: 'Sorry couldn\'t generate the code, details: ' + e.stack}
        }
    }
}

export default PackController
