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
     * @param {FsWrapper} fsWrapper
     */
    constructor(packCollectionReader, templateRenderer, generator, requirementReader, exporter, eRGitter, fsWrapper) {
        super()
        this.model = null
        this.packCollectionReader = packCollectionReader
        this.templateRenderer = templateRenderer
        this.generator = generator
        this.requirementReader = requirementReader
        this.exporter = exporter
        this.eRGitter = eRGitter
        this.fsWrapper = fsWrapper
    }

    /**
     * @asnyc
     * @param {string} from
     * @param {string} to
     */
    async _copyPacksIfNotExist(from, to) {
        if(! await this.fsWrapper.pathExists(to)) {
            await this.fsWrapper.copy(from,to)
        }
    }

    /**
     * According to the single source of truth convention,
     * builtin packages should be copied to the user packages directory
     * and the softver only process with the user packages directory 
     * @returns {PackCollection}
     */
    async _getPackCollection() {

        await this._copyPacksIfNotExist(Config.builtinPacksFolderPath, Config.userPacksFolderPath)
        
        let packs = await this.packCollectionReader.getPacks(Config.userPacksFolderPath)
        return packs
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

            // get pack collection
            let packs = await this._getPackCollection()
            
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
                    if(template)
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
