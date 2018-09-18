let a = new Arranger()

class Arrangable {
    constructor(x,y) {
        this._x = x
        this._y = y
    }
    x(val = "get") {
        if(val === "get") {
            return this._x
        }else {
            this._x = val
        }
    }
    y(val = "get") {
        if(val === "get") {
            return this._y
        }else {
            this._y = val
        }
    }

    toString() {
        return "x: "+this.x()+" | y: "+this.y()
    }
}


let object1 = new Arrangable(1,2)
let object2 = new Arrangable(1,2)
let object3 = new Arrangable(1,2)

a.add(object1)
a.add(object2)
a.add(object3)


let fail = false
for(let i = 0 ; i < 100; i++) {
    let lengthSquare1 = Math.pow(object1.x() - object2.x(),2) + Math.pow(object1.y() - object2.y(),2)
    let lengthSquare2 = Math.pow(object1.x() - object3.x(),2) + Math.pow(object1.y() - object3.y(),2)
    let lengthSquare3 = Math.pow(object3.x() - object2.x(),2) + Math.pow(object3.y() - object2.y(),2)
    a.tick()

    let lengthSquare1_after = Math.pow(object1.x() - object2.x(),2) + Math.pow(object1.y() - object2.y(),2)
    let lengthSquare2_after = Math.pow(object1.x() - object3.x(),2) + Math.pow(object1.y() - object3.y(),2)
    let lengthSquare3_after = Math.pow(object3.x() - object2.x(),2) + Math.pow(object3.y() - object2.y(),2)

    let sumL = lengthSquare1 + lengthSquare2 + lengthSquare3
    let sumLAfter = lengthSquare1_after + lengthSquare2_after + lengthSquare3_after
    
    console.log(lengthSquare1 , lengthSquare2 , lengthSquare3);
    console.log(lengthSquare1_after , lengthSquare2_after , lengthSquare3_after);
    

    if(sumL >= sumLAfter && lengthSquare1 < 100 && lengthSquare2 < 100 && lengthSquare3 < 100) fail = true
    console.log(object1+" ",object2+" ",object3+" ");
}

if(fail) {
    console.error("Test failed")
} else {
    console.log("Test passed");
}