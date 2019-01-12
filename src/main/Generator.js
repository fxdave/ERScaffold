
import EntityTemplate from './templates/entities/entities.template'
import fs from 'fs';

class Generator {
/*
    constructor() {
        this.files = []
        this.renderedFiles = {}
    }

    generate(model) {
        let template = new EntityTemplate(model)
        this.files = [...template.getFiles(), ...this.files]

        this.files.sort((f1, f2) => {
            return f2.isBase() - f1.isBase()
        }).map(file => {
            console.log(file);
            this.renderedFiles[file.getDestination()] = {
                url: file.getDestination(),
                rendered: file.render(this.renderedFiles[file.getDestination()])
            }
        })

        Object.values(this.renderedFiles).map(v => {
            let destinationDir = v.url.split('/')
            destinationDir.pop()
            let dir = process.cwd() + '/' + destinationDir.join('/')
            if (!fs.existsSync(dir)) {
                fs.mkdir(dir, { recursive: true }, (err) => {
                    if (err) throw err;
                });
            }

            fs.writeFile(process.cwd() + '/' + v.url, v.rendered, function (err) {
                if (err) {
                    return console.log(err)
                }
                console.log('The file was saved!')
            })

        })
    }

*/
}

export default Generator