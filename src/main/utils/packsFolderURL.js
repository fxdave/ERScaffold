import os from 'os'
import fs from 'fs'
import path from 'path'
let packs_folder = os.homedir() + '/.config/erscaffold/packs'

if (!fs.existsSync(packs_folder)) {
    packs_folder = path.join(__dirname,"../../../packs")
}

export default packs_folder