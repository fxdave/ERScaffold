import {promises as fsp} from 'fs'

class FileUtil {

    static getFileContent(url) {

        return fsp.realpath(url)
            .then((realurl) => new Promise((resolve, reject) => {
                fsp.access(realurl)
                    .then(function () {
                        resolve(realurl)
                    })
                    .catch(function (err) {
                        reject(err)
                    })
            }))
            .then((realurl) => fsp.readFile(realurl, 'utf8'))
    }

    static getOutputFromSource(source, output, vars = {}) {

        for(let i in vars)
            this[i] = vars[i]

        console.log(this);
        

        try {
            let a = eval(source + '\n ' + output)
            return a
        } catch(err) {
            console.error(err);
            
            return null
        }
    }

    static getScript(url, output) {

        return new Promise((resolve, reject) => {
            console.log("Getting script:", url);

            FileUtil.getFileContent(url)
                .then(file => {
                    resolve(FileUtil.getOutputFromSource(file,output))
                })
                .catch(error => {
                    console.error(error);
                    resolve(null)
                })

        })
    }

    static ls(path) {

        return fsp.realpath(path)
            .then(realurl => {
                return fsp.readdir(realurl)
            })
    }
}

export default FileUtil