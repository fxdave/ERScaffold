import Anchor from './Abstract/Anchor'

class CenterAnchor extends Anchor {
    constructor(whatElement) {
        super(whatElement)

        if (!whatElement.shape) {
            console.error('CenterAnchor: forElement and whatElement must have shape')
        } else if (!whatElement.shape.x) {
            console.error('CenterAnchor: wrong shape object')
        } else {

            this.whatShape = whatElement.shape

            console.log('CenterAnchor: initialized')

            this.update()
            whatElement.shape.addEventListener('updated:width', () => {
                this.update()
            })

        }

    }

    update() {
        super.update()
        this.whatShape.x(-this.whatShape.width()/2)
        this.whatShape.y(-this.whatShape.height()/2)
        this.whatShape.dispatchEvent(new Event('updated:position'))
    }
}

export default CenterAnchor