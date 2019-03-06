import os from 'os'
import Controller from './Controller'
import ERModel from '../Model/ERModel'
import PackCollection from '../Model/PackCollection'
import Pack from '../Model/Pack'
import PackCollectionReader from '../PackUtils/PackCollectionReader/PackCollectionReader'
import TemplateRenderer from '../PackUtils/TemplateRenderer/TemplateRenderer'
import Generator from '../PackUtils/Generator/Generator'
import RequirementReader from '../PackUtils/RequirementReader/RequirementReader'
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
     * @param {RequirementReader} requirementReader
     */
    constructor(packCollectionReader, templateRenderer, generator, requirementReader) {
        super()
        this.model = null
        this.packCollectionReader = packCollectionReader
        this.templateRenderer = templateRenderer
        this.generator = generator
        this.requirementReader = requirementReader
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

            let out = options.map(
                ({ entity, packs }) =>
                    new PackageListItem(entity.id, entity.name, packs)
            )

            console.log(out)
            
            return out
        } catch (e) {
            return {
                success: false,
                msg: 'Sorry couldn\'t fetch the pack, details:' + e.stack
            }
        }
    }

    /**
     *
     * @param {Object} e
     * @param {string[]} data the selected templates' path
     */
    async generateSelectedPackages(e, data) {
        try {
            let entities = this.model.getEntities()
            await Promise.all(entities.map(async entity => {
                
                
                // we musn't render its children, because children requirements are passed by data too
                let requirements = await Promise.all(data.map(reqPath => {
                    return this.requirementReader.getRequirement(reqPath)
                }))
                
                let templates = await Promise.all(
                    requirements.map(req =>
                        this.templateRenderer.renderTemplate(
                            req.template,
                            req.data({ entity })
                        )
                    )
                )

                return await this.generator.generate(templates)

            }))
            return { succcess: true }
        } catch(e) {
            return { succcess: false, msg: 'Sorry couldn\'t generate the code, details: ' + e + e.stack}
        }
    }
}

export default PackController
