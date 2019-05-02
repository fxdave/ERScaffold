import assert from 'assert'
import ProjectFolderSelector from './ProjectFolderSelector'
import path from 'path'
import FsWrapper from '../FsWrapper/FsWrapper';

describe("ProjectFolderSelector test", () => {
    let fsWrapper = new FsWrapper()

    it("should stay the same", async (done) => {
        const projectFolderSelector = new ProjectFolderSelector(undefined, fsWrapper)
        assert.ok(projectFolderSelector.isSelected())
        done()
    })

    it("should apply the previous dir", async (done) => {
        let cwd = process.cwd()
        const projectFolderSelector = new ProjectFolderSelector('..', fsWrapper)
        await projectFolderSelector.apply()
        console.log('cwd',path.join(cwd,'..'));
        console.log(process.cwd());

        assert.equal(path.dirname(cwd), process.cwd())
        assert.ok(projectFolderSelector.isSelected())
        done()
    })

    it("should select the previous dir", async (done) => {
        let cwd = process.cwd()
        const projectFolderSelector = new ProjectFolderSelector(undefined, fsWrapper)
        await projectFolderSelector.select('..')
        
        assert.equal(path.join(cwd,'..'), process.cwd())
        assert.ok(projectFolderSelector.isSelected())

        done()
    })
}) 