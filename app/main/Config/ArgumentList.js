import { app } from 'electron'

console.log(require('electron'))

let argv

if (app.isPackaged) {
    argv = process.argv.slice(1)
} else {
    argv = process.argv.slice(5)
}

export default argv
