import assert from 'assert'
import ProjectFolderSelector from './ProjectFolderSelector'
import path from 'path'

describe("ProjectFolderSelector test", () => {
    it("should stay the same", () => {
        const projectFolderSelector = new ProjectFolderSelector()
        assert.ok(projectFolderSelector.isSelected())
    })

    it("should apply the previous dir", () => {
        let cwd = process.cwd()
        const projectFolderSelector = new ProjectFolderSelector('..')
        projectFolderSelector.apply()

        assert.equal(path.dirname(cwd), process.cwd())
        assert.ok(projectFolderSelector.isSelected())
    })

    it("should select the previous dir", () => {
        let cwd = process.cwd()
        const projectFolderSelector = new ProjectFolderSelector()
        projectFolderSelector.select('..')

        assert.equal(path.dirname(cwd), process.cwd())
        assert.ok(projectFolderSelector.isSelected())
    })
}) 