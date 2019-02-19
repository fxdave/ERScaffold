import FileUtil from './FileUtil';
import packs_folder from './utils/packsFolderURL'


class PackUtil {

    static getPack(packName) {
        let packIndexURL = packs_folder + '/' + packName + '/index.pack.js'

        return FileUtil.getScript(packIndexURL, "pack")
            .then(pack => {
                return new Promise((resolve, reject) => {
                    if (pack == null) {
                        resolve(null)
                        return
                    }

                    pack.dir = packName

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

        return FileUtil.getScript(packs_folder + '/' + packName + '/' + requirement.file, 'requirement')
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

        return FileUtil.ls(packs_folder)
            .then(packs => {
                return Promise.all(packs.map(pack => PackUtil.getPack(pack)))
            })
            .then(packIndices => {
                return new Promise((resolve, reject) => {
                    console.log(packIndices);

                    resolve(
                        packIndices
                            .filter(pack => pack != null)
                        /*
                           .map(pack => {
                           if (pack.requirements)
                           pack.requirements = PackUtil.getPlainArray(pack.requirements)
                           return pack
                           })
                           */
                    )
                })
            })

    }

    static filterPacksForEntity(packs, entiy) {

        return packs.map(pack => {
            pack.requirements = pack.requirements.map(req => {
                if (req) {
                    req.disabled = false
                    if (req.data(entiy) === null)
                        req.disabled = true
                }
                return req
            })
            return pack
        })
    }

    static getFilteredPacksForEntities(entities) {
        let options = {}

        return PackUtil.getPacks()
            .then(packs => {
                return new Promise((resolve, reject) => {
                    entities.forEach((entity, index) => {
                        options[entity.getID()] = {
                            entity: entity,
                            packs: PackUtil.filterPacksForEntity(packs, entity)
                        }
                    })

                    resolve(Object.values(options))
                })
            })
    }
}

PackUtil.packsFolder = packs_folder

export default PackUtil
