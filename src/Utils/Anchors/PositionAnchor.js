import Anchor from './Abstract/Anchor'

class PositionAnchor extends Anchor {
    constructor(forElement, whatElement, props, centered = false) {
        super(forElement)

        this.centered = centered

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

        let sizes = {
            for: {
                W: this.forShape.width(),
                H: this.forShape.height()
            },
            what: {
                W: this.whatShape.width(),
                H: this.whatShape.height()
            }
        }
        if(this.centered) {
            sizes.for.W /= 2
            sizes.for.H /= 2
            sizes.what.W /= 2
            sizes.what.H /= 2
        }

        let horizontal = this.getOffset(this.props.left, this.props.right, sizes.for.W, sizes.what.W)
        if (horizontal) {
            this.whatShape.x(horizontal + this.forShape.x())
        }

        let vertical = this.getOffset(this.props.top, this.props.bottom, sizes.for.H, sizes.what.H)
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