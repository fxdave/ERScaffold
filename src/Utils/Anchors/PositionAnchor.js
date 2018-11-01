import Anchor from './Abstract/Anchor'

class PositionAnchor extends Anchor {
    constructor(forElement, whatElement, props) {
        super(forElement)

        if (!forElement.shape || !whatElement.shape) {
            console.error('PositionAnchor: forElement and whatElement must have shape')
        } else if (!forElement.shape.x || !whatElement.shape.x) {
            console.error('PositionAnchor: wrong shape object')
        } else {

            this.forShape = forElement.shape
            this.whatShape = whatElement.shape
            this.props = props

            console.log('PositionAnchor: initialized')

            this.update()
            forElement.shape.addEventListener('updated:position', () => {
                this.update()
            })
            forElement.shape.addEventListener('updated:width', () => {
                this.update()
            })

        }

    }

    update() {
        super.update()

        let horizontal = this.getOffset(this.props.left, this.props.right, this.forShape.width(), this.whatShape.width())
        if (horizontal) {
            this.whatShape.x(horizontal + this.forShape.x())
        }

        let vertical = this.getOffset(this.props.top, this.props.bottom, this.forShape.height(), this.whatShape.height())
        if (vertical) {
            this.whatShape.y(vertical + this.forShape.y())
        }

        this.whatShape.dispatchEvent(new Event('updated:position'))
    }

    getOffset(leftOffset, rightOffset, width, myWidth) {
        if (leftOffset !== undefined && rightOffset !== undefined) {
            return width / 2 + (leftOffset - rightOffset) - myWidth/2
        } else if (leftOffset !== undefined) {
            return leftOffset
        } else if (rightOffset !== undefined) {
            return width - rightOffset
        } else {
            return NaN
        }
    }
}

export default PositionAnchor