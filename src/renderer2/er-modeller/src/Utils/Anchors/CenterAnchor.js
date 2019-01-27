import Anchor from './Abstract/Anchor'

class CenterAnchor extends Anchor {
    constructor(whatElement) {
        super(whatElement)

        if (!whatElement.getStage()) {
            console.error('CenterAnchor: forElement and whatElement must have shape')
        } else if (!whatElement.getStage().x) {
            console.error('CenterAnchor: wrong shape object')
        } else {

            this.whatShape = whatElement.getStage()

            console.log('CenterAnchor: initialized')

            this.update()
            whatElement.$on('updated:width', () => {
                this.update()
            })

        }

    }

    update() {
        super.update()
        this.whatShape.x(-this.whatShape.getClientRect().width/2)
        this.whatShape.y(-this.whatShape.getClientRect().height/2)
        this.updateable.$emit('updated:position')
    }
}

export default CenterAnchor