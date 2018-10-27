class EventRegister {
    constructor(element, eventName) {
        this.callback = null
        if (!element.shape) {
            console.error("EventRegister: Only elements with shape can have EventRegister")
        } else {
            element.shape.addEventListener(eventName, e => {
                if (this.callback) {
                    this.callback(e)
                }
            })
        }
    }
}
export default EventRegister