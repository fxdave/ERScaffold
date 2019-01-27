import Anchor from './Abstract/Anchor'

class WidthAnchor extends Anchor {
    constructor(forElement, whatElement, props) {
        super(forElement)

        if (!forElement.getStage() || !whatElement.getStage()) {
            console.error('WidthAnchor: forElement and whatElement must have shape')
        } else if (!forElement.getStage().x || !whatElement.getStage().x) {
            console.error('WidthAnchor: wrong shape object')
        } else {

            this.forShape = forElement.getStage()
            this.whatShape = whatElement.getStage()
            this.whatElement = whatElement
            this.props = props

            console.log('WidthAnchor: initialized')

            this.update()
            forElement.$on('updated:width', () => {

                this.update()
            })

        }

    }

    update() {
        super.update()
        let padding = this.props.padding || 0
        this.whatShape.width(this.forShape.getClientRect().width + padding)
        this.whatElement.$emit('updated:width')
    }
}

export default WidthAnchor