import { app } from 'electron'

let argv

if (app.isPackaged) {
    argv = process.argv.slice(1)
} else {
    argv = process.argv.slice(4)
}

export default argv
