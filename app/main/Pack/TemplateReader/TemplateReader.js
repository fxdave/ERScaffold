import FastEJS from 'fastejs'
import Formatter from '../../Formatter/NameFormatter'
import RenderedTemplate from '../../Model/RenderedTemplate'
import TemplateSettings from '../../Model/TemplateSettings'
import path from 'path'

/**
 * Utilities for getting information from a single template, and its dependencies
 */
class TemplateReader {
    /**
     *
     * @param {FsWrapper} fsWrapper
     */
    constructor(fsWrapper) {
        this.fsWrapper = fsWrapper
    }

    /**
     * renders the template and its children
     *
     * @async
     * @param {string} packDirectory the path of the pack directory 
     * @param {string} templateRelativeURL the template file url relative to the pack root
     * @param {Object} data the required params for render the template
     * @returns {RenderedTemplate}
     */
    async getTemplate(packDirectory, templateRelativeURL, data) {
        let templateFileURL = path.join(
            packDirectory,
            templateRelativeURL
        )
        let templateFileContent = await this.fsWrapper.getFileContent(
            templateFileURL
        )

        // extending the data with extra utilities
        data.Formatter = Formatter
        data.APPNAME = data.appName

        // render the template
        FastEJS.settings.returns = '[__out, meta]'
        const out = FastEJS.parse(templateFileContent, data)
        const template_out = out[0]
        const meta = out[1]

        // defining tempalte mode
        let templateMode
        if (meta.extends) templateMode = 'extends'
        if (meta.creates) templateMode = 'creates'

        // getting path
        let path = meta[templateMode].fileName

        // getting extends settings
        let section = meta[templateMode].section
        let place = meta[templateMode].place

        let templateSettings = new TemplateSettings(
            templateMode,
            path,
            section,
            place
        )

        // getting the dependencies
        let dependencies = []
        if (meta.depends_on) {
            dependencies = meta.depends_on.map(dependency => {
                let dependencyTemplateURL = path.join(
                    path.dirname(templateRelativeURL),
                    dependency.template
                )
                let dependencyTemplateData = dependency.data
                return this.getTemplate(
                    packDirectory,
                    dependencyTemplateURL,
                    dependencyTemplateData
                )
            })
        }

        return new RenderedTemplate(templateSettings, template_out, dependencies)
    }
}

export default TemplateReader
