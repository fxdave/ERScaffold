import path from 'path'

class Generator {
    /**
   *
   * @param {FsWrapper} fsWrapper
   * @param {ERGitter} eRGitter
   */
    constructor(fsWrapper, eRGitter) {
        this.fsWrapper = fsWrapper
        this.eRGitter = eRGitter
    }


    /**
   *
   * @async
   * @param {RenderedTemplate} template
   * @returns {any}
   */
    async _processModification(template) {

        if(template.dependencies.length !== 0) {
            await this._createModifications(template.dependencies)
        }

        let templateMode = template.templateSettings.mode

        if (templateMode === 'creates') {
            // Creates a new file on the desired path
            const relativePath = template.templateSettings.path
            const absolutePath = path.join(process.cwd(), relativePath)
            const content = template.content
            return await this.fsWrapper.createFile(
                absolutePath,
                content
            )
        }

        if (templateMode === 'extends') {
            // modify the file
            const relativePath = template.templateSettings.path
            const absolutePath = path.join(process.cwd(), relativePath)
            const content = template.content
            const place = template.templateSettings.place
            const section = template.templateSettings.section

            return await this.fsWrapper.modifyFile(absolutePath, old => {
                if (place === 'replace') return old.replace(section, content)
                if (place === 'after') return old.replace(section, section + content)
                if (place === 'before') return old.replace(section, content + section)
            })
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

        await Promise.all(
            templates.map(template => {
                this._processModification(template)
            })
        )
    }

    /**
   * @async
   * @param {RenderedTemplate[]} templates
   * @returns {boolean}
   */
    async generate(templates) {
        await this.eRGitter.prepare()
        await this._createModifications(templates)
        await this.eRGitter.finalize()
        return true
    }
}

export default Generator
