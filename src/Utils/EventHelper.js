
class EvenetHelper {
    static on(events, elements, callback) {
        if(!(events instanceof Array)) {
            events = [events]
        }
        if(!(elements instanceof Array)) {
            elements = [elements]
        }

        for(let eid in elements) {
            for(let id in events) {
                
                elements[eid].addEventListener(events[id],callback)
            }
        }
    }

    static dropTrough(froms, tos, eventName) {

        if(!(froms instanceof Array)) {
            froms = [froms]
        }
        if(!(tos instanceof Array)) {
            tos = [tos]
        }
        for(let from in froms) {
            for(let to in tos) {
                this._dropTrough(from,to,eventName)
            }
        }
    }

    static _dropTrough(eventName, from ,to ) {
        from.addEventListener(eventName, e => {
            to.dispatchEvent(e)
        })
    }
}

export default EvenetHelper