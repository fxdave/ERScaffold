import { app } from 'electron'

let argv

if (app && app.isPackaged) {
    argv = process.argv.slice(1)
} else {
    argv = process.argv.slice(2)
}

export default argv
