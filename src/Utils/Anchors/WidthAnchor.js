import Anchor from './Abstract/Anchor'
class WidthAnchor extends Anchor {
    constructor(from,to,settings) {
        super()
        from.shape.addEventListener("update", e => {
            this.update()
        })
        to.shape.addEventListener("update", e => {
            this.update()
        })
    }

    
}

export default WidthAnchor