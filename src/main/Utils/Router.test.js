import assert from 'assert'
import Router from './Router'
describe("Router test", () => {
    

    it("should call a method without return statement", () => {
        

        class TestController {
            testMethod(e, data) {
                assert.equal(data,"hello")
            }
        }

        let ipcMain = {
            on(eventName, callback) {
                callback({}, "hello")
            }
        }
        
        let router = new Router(ipcMain)

        router.method("show",new TestController(),'testMethod')
    })

    it("should call a method with return statement", () => {
        

        class TestController {
            testMethod(e, data) {
                assert.equal(data,"hello")
                return "hi"
            }
        }

        let ipcMain = {
            on(eventName, callback) {
                callback({
                    sender: {
                        send(eventName, data) {
                            assert.equal(data, 'hi')
                        }
                    }
                }, "hello")
            }
        }
        
        let router = new Router(ipcMain)

        router.method("show",new TestController(),'testMethod')
    })
}) 