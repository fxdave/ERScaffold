import { ipcMain } from 'electron';

class Router {
  /**
   *
   * @param {string} route the name of the event
   * @param {Controller} controller
   * @param {Function} method
   */
  method(route, controller, method) {
    ipcMain.on(route, e => {
      let out = controller[method](...arguments);

      /*
       * if the controller returned something
       */
      if (out !== null && out != undefined) {
        if (out instanceof Promise) {
          // if the returned value is a Promise
          out
            .then(data => {
              e.sender.send(route, data);
            })
            .catch(data => {
              e.sender.send(route, data);
            });
        } else {
          // if the returned value is not a Promise
          e.sender.send(route, out);
        }
      }
    });
  }
}

export default new Router();
