import Anchor from './Abstract/Anchor'
class WidthAnchor extends Anchor {
    constructor(from,to,settings) {
        super()
        from.setEventListener("update", e => {
            this.update()
        })
        to.setEventListener("update", e => {
            this.update()
        })
    }

    
}

export default WidthAnchor