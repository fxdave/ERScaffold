import Anchor from './Abstract/Anchor'

class WidthAnchor extends Anchor {
    constructor(forElement, whatElement, props) {
        super(forElement)

        if (!forElement.shape || !whatElement.shape) {
            console.error('WidthAnchor: forElement and whatElement must have shape')
        } else if (!forElement.shape.x || !whatElement.shape.x) {
            console.error('WidthAnchor: wrong shape object')
        } else {

            this.forShape = forElement.shape
            this.whatShape = whatElement.shape
            this.props = props

            console.log('WidthAnchor: initialized')

            this.update()
            forElement.shape.addEventListener('updated:width', () => {

                this.update()
            })

        }

    }

    update() {
        super.update()
        let padding = this.props.padding || 0
        this.whatShape.width(this.forShape.width() + padding)
        this.whatShape.dispatchEvent(new Event('updated:width'))
    }
}

export default WidthAnchor