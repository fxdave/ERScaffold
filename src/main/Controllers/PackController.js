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
import Config from '../Config/Config'

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
     * @param {Exporter} exporter
     * @param {ERGitter} eRGitter
     */
    constructor(packCollectionReader, templateRenderer, generator, requirementReader, exporter, eRGitter) {
        super()
        this.model = null
        this.packCollectionReader = packCollectionReader
        this.templateRenderer = templateRenderer
        this.generator = generator
        this.requirementReader = requirementReader
        this.exporter = exporter
        this.eRGitter = eRGitter
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
            this.rawModel = model // stored for export
            this.model = new ERModel(model)

            // getting builtin packs
            let packsFolderBuiltin = Config.builtinPacksFolderPath
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
            
            return {
                success: true,
                msg: out
            }
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
     * @param {string[]} requirementPaths the selected templates' path
     */
    async generateSelectedPackages(e, requirementPaths) {
        try {
            let entities = this.model.getEntities()
            let templates = []
            for(let entity of entities) {
                // we musn't render its children, because children requirements are passed by data too

                for(let reqIndex in requirementPaths) {
                    let requirementPath = requirementPaths[reqIndex]
                    let requirement = await this.requirementReader.getRequirement(requirementPath)
                    let template = await this.templateRenderer.renderTemplate(
                        requirement.templatePath,
                        {
                            ...requirement.data({ entity }),
                            appName: this.model.appName
                        }
                    )

                    templates.push(template)
                }

            }
            
            // preparing git repository
            await this.eRGitter.prepare()
            // generating files
            await this.generator.generate(templates)
            // saving the diagram
            await this.exporter.export(this.rawModel, path.join(process.cwd(), Config.defaultFileName))
            // commit changes
            await this.eRGitter.finalize()

            return { success: true }
        } catch(e) {
            return { success: false, msg: 'Sorry couldn\'t generate the code, details: ' + e + e.stack}
        }
    }
}

export default PackController
