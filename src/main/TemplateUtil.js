
import FileUtil from './FileUtil'
import PackUtil from './PackUtil'
import Formatter from './Formatter'
import ejs from 'ejs'

class TemplateUtil {
    static getTemplate(pack, template, data, APPNAME) {
        return FileUtil
        .getFileContent(PackUtil.packsFolder + "/" + pack + "/" + template)
        .then(cont => {
            return new Promise((resolve,reject) => {

                let metaDefinition = cont.split("%>")[0].replace("<%","")
        
                // Dependecies:
                data.Formatter = Formatter
                data.APPNAME = APPNAME
                Object.values(data).forEach((key,val) => {
                    this[key] = val
                })

                let meta = FileUtil.getOutputFromSource(metaDefinition,"meta",data)
                let template = ejs.render(cont,data)

                resolve({
                    meta,
                    template
                })
            })
        })
    }
}

export default TemplateUtil