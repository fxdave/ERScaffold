import React from 'react'
import Anchor from './Anchor'

class PositionAnchor extends Anchor {

    update = () => {

        if (this.props.reference && this.props.element) {
            console.log(this.props.reference());

            let sizes = {
                for: this.props.reference().getClientRect(),
                what: this.props.element().getClientRect()
            }
            console.log(sizes);

            if (this.props.centered) {
                sizes.for.width /= 2
                sizes.for.height /= 2
                sizes.what.width /= 2
                sizes.what.height /= 2
            }

            let newX, newY
            let horizontal = this.getOffset(this.props.left, this.props.right, sizes.for.width, sizes.what.width)
            if (horizontal) {
                newX = horizontal + this.props.reference().x()
            }

            let vertical = this.getOffset(this.props.top, this.props.bottom, sizes.for.height, sizes.what.height)
            if (vertical) {
                newY = vertical + this.props.reference().y()
            }

            if (this.props.element().x() !== newX || this.props.element().y() !== newY)
                this.props.change(newX, newY)
        }
    }


    getOffset(leftOffset, rightOffset, width, myWidth) {
        if (leftOffset !== undefined && rightOffset !== undefined) {
            return width / 2 + (leftOffset - rightOffset) - myWidth / 2
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