function mix() {
    let mixins = {}
    for (i = 0; i < arguments.length; i++) {
        if(i != 0) {
            mixins = {
                ...mixins,
                ...arguments[i]
            }
        }
    }
    const newClass = function(){}
    newClass.prototype = arguments[0]
    Object.assign(newClass.prototype,mixins)
    return newClass
}