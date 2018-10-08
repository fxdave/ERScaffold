class Model {
    toObject() {
        let obj = {};
        for(let i in this) { 
            if(this[i].toObject) {
                obj[i] = this[i].toObject()
            } else {
                obj[i] = this[i]
            }
        }
        return obj
    }
}

export default Model