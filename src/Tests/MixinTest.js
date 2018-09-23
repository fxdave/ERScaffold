const mixin1 = {
    storage : [],
    add(elem) {
        this.storage.push(elem)
    },
    getAll() {
        return this.storage
    }
}

const mixin2 = {
    remove(elem) {
        this.valami = true
        this.storage = this.storage.filter( e => {
            return e != elem
        })
    }
}

class Base {
    constructor() {
        this.valami = false
    }
}

class Valami extends mix(Base,mixin1,mixin2) {

}

let v= new Valami
v.add(123)
let all = v.getAll()

let good = true
if(all[0] != 123) {
    good = false
}

v.remove(123)

if(v.getAll().length != 0) {
    good = false
}

if(v.valami == false) {
    good = false
}

if(good) {
    console.log("test passed!");
    
} else {
    console.error("test failed!");
    
}