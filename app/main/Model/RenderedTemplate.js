
class RenderedTemplate {
    /**
     * 
     * @param {TemplateSettings} templateSettings 
     * @param {string} content
     * @param {RenderedTemplate[]} dependencies 
     */
    constructor(templateSettings, content, dependencies) {
        this.templateSettings = templateSettings
        this.content = content
        this.dependencies = dependencies
    }
}

export default RenderedTemplate 