import Anchor from './Abstract/Anchor'
class WidthAnchor extends Anchor {
    constructor(from,to,settings) {
        super()
        from.addEventListener("update", e => {
            this.update()
        })
        to.addEventListener("update", e => {
            this.update()
        })
    }

    
}

export default WidthAnchor