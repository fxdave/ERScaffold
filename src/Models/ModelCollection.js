
import Model from './Abstract/Model'
class ModelCollection extends Model {
    constructor(){
        super()
        this.storage = new Map()
        this.lastID = 0
    }

    /**
     * 
     * @param {Object} obj 
     * @returns {number} id
     */
    add(obj) {
        this.storage.set(this.lastID, obj)
        obj.id = this.lastID
        this.lastID++;
        return obj.id
    }

    /**
     * @param {number} id 
     */
    remove(id) {
        this.storage.delete(id)
    }

    /**
     * 
     * @param {number} id
     * @returns {Object} 
     */
    get(id) {
        return this.storage.get(id)
    }

    all() {
        return Array.from(this.storage)
    }


    toObject() {
        let obj = {
            elements : this.all()
        };
        return obj
    }
}

export default ModelCollection