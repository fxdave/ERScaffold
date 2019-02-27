import TemplateRenderer from './TemplateRenderer'
import assert from 'assert'
import RenderedTemplate from '../../Model/RenderedTemplate';

describe("TemplateRenderer test", () => {

    let fsWrapper = {
        getFileContent(path) {
            if(path == "/path/to/template.ejs") return `<%

            let meta = {
                creates: {
                    fileName: "lib/_web/views/_view.ex"
                }
            }
            
            %> some content`

            return null
        }
    }

    it("Should render a template", async done => {
        let templateRenderer = new TemplateRenderer(fsWrapper)
        let rendered = await templateRenderer.renderTemplate("/path/to/template.ejs",{})

        assert.ok(rendered instanceof RenderedTemplate)
        assert.equal(rendered.templateSettings.mode,'creates')
        assert.equal(rendered.templateSettings.path,'lib/_web/views/_view.ex')
        assert.equal(rendered.content, ' some content')
        done()
    })
})