const fsp = require('fs').promises
const packs_folder = require('os').homedir() + '/.config/erscaffold/packs'


export default class {

    static getPack(packName) {
        let packIndexURL = packs_folder + '/' + packName + '/index.pack.js'

        return PackUtil.getScript(packIndexURL, "pack")
            .then(pack => {
                return new Promise((resolve, reject) => {
                    if (pack == null) {
                        resolve(null)
                    }

                    PackUtil.getRequirements(pack.requirements, packName)
                        .then(reqs => {
                            pack.requirements = reqs
                            resolve(pack)
                        })
                })
            })
    }

    static getRequirements(requirements, packName) {
        return Promise.all(requirements.map(req => PackUtil.getRequirement(req, packName)))
    }

    static getRequirement(requirement, packName) {

        return PackUtil.getScript(packs_folder + '/' + packName + '/' + requirement.file, 'requirement')
            .then(req => {

                return new Promise((resolve, reject) => {
                    if (requirement.children) {
                        PackUtil.getRequirements(requirement.children, packName)
                            .then(requirements => {
                                req.children = requirements
                                resolve(req)
                            })
                    } else {
                        resolve(req)
                    }
                })
            })
    }

    static getScript(url, output) {

        return new Promise((resolve, reject) => {
            fsp.realpath(url)
                .then((realurl) => new Promise((resolve, reject) => {
                    fsp.access(realurl)
                        .then(function () {
                            resolve(realurl)
                        })
                        .catch(function (err) {

                            reject(err)
                        })
                }))
                .then((realurl) => fsp.readFile(realurl, { encoding: 'utf8' }))
                .then(file => {
                    let a
                    try {
                        a = eval(file + '\n ' + output)
                    } catch{
                        console.error("Wrong script at: " + url)
                    }
                    resolve(a)
                })
                .catch(error => {
                    console.error(error);
                    resolve(null)
                })

        })
    }


    static getPlainArray(arr, depth = 0) {

        let newArr = []
        arr.forEach((item, index) => {
            if (item) {
                item.depth = depth

                if (item.children) {
                    newArr = [...newArr, item, ...PackUtil.getPlainArray(item.children, depth + 1)]
                } else {
                    newArr = [...newArr, item]
                }
            }
        })

        newArr.map(val => {
            if (val) {
                val.children = undefined
            }
            return val
        })

        return newArr
    }

    static getPacks() {

        return fsp.realpath(packs_folder)
            .then(realurl => {
                return fsp.readdir(realurl)
            })
            .then(packs => {
                return Promise.all(packs.map(pack => PackUtil.getPack(pack)))
            })
            .then(packIndices => {
                return new Promise((resolve, reject) => {
                    resolve(
                        packIndices
                            .filter(pack => pack != null)
                            .map(pack => {

                                pack.requirements = PackUtil.getPlainArray(pack.requirements)
                                return pack
                            })
                    )
                })
            })

    }

    static filterPacksForEntity(packs, entiy) {
        return packs.map(pack => {
            pack.requirements = pack.requirements.filter(req => {
                return req.data(entiy) != null
            })
            return pack
        })
    }
}
