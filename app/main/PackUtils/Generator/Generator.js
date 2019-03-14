import path from 'path'
import Logger from '../../Logger/Logger'

class Generator {
    /**
   *
   * @param {FsWrapper} fsWrapper
   * @param {ERGitter} eRGitter
   */
    constructor(fsWrapper, eRGitter) {
        this.fsWrapper = fsWrapper
        this.eRGitter = eRGitter
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
        templates.sort(function(a, b) {
            return ('' + a.templateSettings.mode).localeCompare(b.templateSettings.mode)
        })

        this.logger.log('Start generating templates: ', templates)

        for(let template of templates)
            await this._processModification(template)
    }

    /**
   * @async
   * @param {RenderedTemplate[]} templates
   */
    async generate(templates) {
        await this.eRGitter.prepare()
        await this._createModifications(templates)
        await this.eRGitter.finalize()
    }
}

export default Generator
