
export default function LifeCycleDecorator(Decorable) {
    

    function LifeCycleDecorated(arg) {  
        Decorable.call(this, arg);
    }

    LifeCycleDecorated.prototype = new Decorable()

    LifeCycleDecorated.prototype.add = function () {
        Decorable.prototype.add.call(this, ...arguments)
        console.log(arguments);
        
        for (let i = 0; i < arguments.length; i++) {
            console.log(arguments[i]);
            if (arguments[i].mounted)
                arguments[i].mounted()
        }
    }
/*
    LifeCycleDecorated.prototype.remove = function () {
        this.dispatchEvent(new Event("delete"))
        Decorable.prototype.remove.call(this)
    }
*/
    return LifeCycleDecorated
}
