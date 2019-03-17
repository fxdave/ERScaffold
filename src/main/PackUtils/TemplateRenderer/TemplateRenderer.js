import FastEJS from 'fastejs'
import Formatter from '../../Formatter/NameFormatter'
import RenderedTemplate from '../../Model/RenderedTemplate'
import TemplateSettings from '../../Model/TemplateSettings'
import path from 'path'

/**
 * Utilities for getting information from a single template, and its dependencies
 */
class TemplateRenderer {
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
     * @param {string} templateFilePath the path of the template
     * @param {Object} data the required params for render the template
     * @returns {RenderedTemplate}
     */
    async renderTemplate(templateFilePath, data) {
        let templateFileContent = await this.fsWrapper.getFileContent(
            templateFilePath
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
        let createPath = meta[templateMode].fileName

        // getting extends settings
        let section = meta[templateMode].section
        let place = meta[templateMode].place

        let templateSettings = new TemplateSettings(
            templateMode,
            createPath,
            section,
            place
        )

        // getting the dependencies
        let dependencies = []
        if (meta.depends_on) {
            dependencies = await Promise.all(meta.depends_on.map(dependency => {

                let dependencyTemplateURL = path.join(
                    path.dirname(templateFilePath),
                    dependency.template
                )

                let dependencyTemplateData = dependency.data

                return this.renderTemplate(
                    dependencyTemplateURL,
                    dependencyTemplateData
                )
            }))
        }

        return new RenderedTemplate(templateSettings, template_out, dependencies)
    }
}

export default TemplateRenderer
