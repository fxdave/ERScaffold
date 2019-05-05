import TemplateRenderer from './TemplateRenderer'
import assert from 'assert'
import RenderedTemplate from '../../Model/RenderedTemplate';


const tempalteA = `<%

let meta = {
    creates: {
        fileName: "lib/_web/views/_view.ex"
    },
    depends_on: [
        {template: 'templateB.ejs', data: {}}
    ]
}

%> some content`

const tempalteB = `<%

let meta = {
    creates: {
        fileName: "lib/_web/views/_view2.ex"
    },
    depends_on: [
       {template: 'templateA.ejs', data: {}}
    ]
}

%> some content`


describe("TemplateRenderer test", () => {

    let fsWrapper = {
        getFileContent(path) {
            if(path == "/path/to/templateA.ejs") return tempalteA
            if(path == "/path/to/templateB.ejs") return tempalteB

            return null
        }
    }

    it("Should render a template", async done => {
        let templateRenderer = new TemplateRenderer(fsWrapper)
        let rendered = await templateRenderer.renderTemplate("/path/to/templateA.ejs",{})

        assert.ok(rendered instanceof RenderedTemplate)
        assert.equal(rendered.templateSettings.mode,'creates')
        assert.equal(rendered.templateSettings.path,'lib/_web/views/_view.ex')
        assert.equal(rendered.dependencies[0].templateSettings.path,'lib/_web/views/_view2.ex')
        assert.equal(rendered.dependencies[0].dependencies[0],undefined)
        assert.equal(rendered.content, ' some content')
        done()
    })
})