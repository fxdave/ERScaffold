import FsWrapper from './FsWrapper'
import assert from 'assert'
import path from 'path'
import {promises as fsp} from 'fs'
describe("FsWrapper test", () => {
    it("should list the elements of a directory", async (done) => {
        let fsWrapper = new FsWrapper()
        let list = await fsWrapper.ls(__dirname)
        assert.ok(list instanceof Array && list.length > 1)
        done()
    })

    it("should list the files of a directory", async done => {
        let fsWrapper = new FsWrapper()
        let list = await fsWrapper.glob(path.join(__dirname, '/*.js'))
        assert.ok(list instanceof Array && list.length > 1)
        
        let allJs = list.reduce((acc,x) => acc && x.indexOf('.js') !== -1, true)
        assert.ok(allJs)

        done()
    })

    it("should create and read a file", async done => {
        let fsWrapper = new FsWrapper()
        let testPath = path.join(__driname,'test')
        //create
        await fsWrapper.createFile(testPath,'test content')
        //read
        let content = await fsWrapper.getFileContent(testPath)
        //delete
        await fsp.unlink(testPath)
        
        assert.equal(content, "test content")
        done();
    })

    it("should modify a file ", async done => {
        let fsWrapper = new FsWrapper()
        let testPath = path.join(__driname,'test')
        //create
        await fsWrapper.createFile(testPath,'test content')
        //modify
        await fsWrapper.modifyFile(testPath, old => "test2 content")
        //read
        let content = await fsWrapper.getFileContent(testPath)
        //delete
        await fsp.unlink(testPath)

        assert.equal(content, "test2 content")
        done()

    })
})