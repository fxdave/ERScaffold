import os from 'os'
import fs from 'fs'
import path from 'path'

/*
 * Packs can be managed by users by adding their own in ~/.config/erscaffold/packs
 */
let packs_folder = os.homedir() + '/.config/erscaffold/packs'

/**
 * but this is not required so we have some default packs for the users in the project source 
 */
if (!fs.existsSync(packs_folder)) {
    packs_folder = path.join(__dirname,"../../../packs")
}

export default packs_folder