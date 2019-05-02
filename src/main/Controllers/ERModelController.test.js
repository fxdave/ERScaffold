import ERModelController from './ERModelController'
import assert from 'assert'
import FsWrapper from '../FsWrapper/FsWrapper';
import Exporter from '../Utils/Exporter'

describe("test of ERModelController", () => {

    let electronDialog = {
        showSaveDialog() {
            return "/save/here"
        },
        showOpenDialog() {
            return ["/open/from/here"]
        }
    }
    
    it("tests the export function", (done) => {


        let fsWrapper = {
            async createFile(path,content) {
                assert.equal(path,'/save/here')
                assert.equal(content,JSON.stringify({'some':'json'}))
                done()
            }
        }

        let exporter = new Exporter(fsWrapper)
        let eRModelController = new ERModelController(fsWrapper,electronDialog,exporter)
        eRModelController.export(null, {'some':'json'})
    })    

    it("tests the import function", async (done) => {

        let fsWrapper = {
            async getFileContent(path) {
                return "{'some':'json'}"
            }
        }

        let exporter = new Exporter(fsWrapper)
        let eRModelController = new ERModelController(fsWrapper,electronDialog, exporter)
        let returns = await eRModelController.import()
        
        assert.equal(returns, "{'some':'json'}")
        done()
    })    
})