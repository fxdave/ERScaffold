import ERModelController from './ERModelController'
import assert from 'assert'
import FsWrapper from '../FsWrapper/FsWrapper';

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

        let eRModelController = new ERModelController(fsWrapper,electronDialog)
        eRModelController.export(null, {'some':'json'})
    })    

    it("tests the import function", async (done) => {

        let fsWrapper = {
            async getFileContent(path) {
                return "{'some':'json'}"
            }
        }

        let eRModelController = new ERModelController(fsWrapper,electronDialog)
        let returns = await eRModelController.import()
        
        assert.equal(returns, "{'some':'json'}")
        done()
    })    
})