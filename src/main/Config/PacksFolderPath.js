import {
    app
} from "electron";
import path from 'path'

let p = "";

if (app.isPackaged) {
    p = path.join(path.dirname(__dirname), '..', '..', '..', 'packs')
} else {
    p = path.join(__dirname, '..', '..', 'packs')
}

export default p