import { ipcMain } from 'electron'

class Router {

    /**
     * 
     * @param {IpcMain} ipcMain 
     */
    constructor(ipcMain) {
        this.ipcMain = ipcMain
    }

    /**
     *
     * @param {string} route the name of the event
     * @param {Controller} controller
     * @param {string} method
     */
    method(route, controller, method) {
        this.ipcMain.on(route, function(e) {
            let out = controller[method](...arguments)

            /*
             * if the controller returned something
             */
            if (out !== null && out != undefined) {
                if (out instanceof Promise) {
                    // if the returned value is a Promise
                    out
                        .then(data => {
                            e.sender.send(route, data)
                        })
                        .catch(data => {
                            e.sender.send(route, data)
                        })
                } else {
                    // if the returned value is not a Promise
                    e.sender.send(route, out)
                }
            }
        })
    }
}

export default Router
