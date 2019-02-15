class EventRegister {
    constructor(element, eventName, callbackName = undefined) {
        this.callbackName = callbackName
        this.callback = null
        if (!element.shape) {
            console.error('EventRegister: Only elements with shape can have EventRegister')
        } else {
            if (element.shape.on) {
                element.shape.on(eventName, e => {
                    this.callCallback(e)
                })
            } else {
                element.shape.addEventListener(eventName, e => {
                    this.callCallback(e)
                })
            }
        }
    }

    callCallback(e) {
        if (this.callback) {
            this.callback(e)
        }
    }
}
export default EventRegister