import path from 'path'
import Logger from '../../Logger/Logger'

class Generator {
    /**
   *
   * @param {FsWrapper} fsWrapper
   */
    constructor(fsWrapper) {
        this.fsWrapper = fsWrapper
        this.logger = new Logger('PackUtils\\Generator')
        this.alreadyCreatedTemplates = []
    }


    /**
     *
     * @async
     * @param {RenderedTemplate} template
     * @returns {any}
     */
    async _processModification(template) {
        let templateID = JSON.stringify(template)

        if(this.alreadyCreatedTemplates.indexOf(templateID) == -1) {
            this.logger.log('Processing template: ',template)

            let templateMode = template.templateSettings.mode

            if (templateMode === 'creates') {
            // Creates a new file on the desired path
                const relativePath = template.templateSettings.path
                const absolutePath = path.join(process.cwd(), relativePath)
                const content = template.content
                await this.fsWrapper.createFile(
                    absolutePath,
                    content
                )
            } else if (templateMode === 'extends') {
            // modify the file
                const relativePath = template.templateSettings.path
                const absolutePath = path.join(process.cwd(), relativePath)
                const content = template.content
                const place = template.templateSettings.place
                const section = template.templateSettings.section

                await this.fsWrapper.modifyFile(absolutePath, old => {
                    if (place === 'replace') return old.replace(section, content)
                    if (place === 'after') return old.replace(section, section + content)
                    if (place === 'before') return old.replace(section, content + section)
                })
            } else {
                this.logger.log('Wrong template mode in template: ', template)
            }

            this.alreadyCreatedTemplates.push(templateID)
            if(template.dependencies.length !== 0) {
                await this._createModifications(template.dependencies)
            }
        } else {
            this.logger.log('Skipping a template, because it is already generated.')
        }
    }

    /**
   * @asnyc
   * @param {RenderedTemplate[]} templates
   */
    async _createModifications(templates) {
        let orderedTemplates = this._makingOrder(templates)



        for(let item of orderedTemplates) {
            console.log(item.templateSettings.mode, item.templateSettings.path)
        }

        for(let template of orderedTemplates)
            await this._processModification(template)
    }

    _makingOrder(templates) {
        
        for(let template of templates) {
            let templateID = JSON.stringify(template)
            if(!this.toGenerate[templateID]) {
                this.toGenerate[templateID] = template
                this._makingOrder(template.dependencies)
            }
        }

        let templateArray = Object.values(this.toGenerate)

        templateArray.sort(function(a, b) {
            return ('' + a.templateSettings.mode).localeCompare(b.templateSettings.mode)
        })

        return templateArray
    }

    /**
     * @async
     * @param {RenderedTemplate[]} templates
     */
    async generate(templates) {
        this.toGenerate = {}
        await this._createModifications(templates)
    }
}

export default Generator
