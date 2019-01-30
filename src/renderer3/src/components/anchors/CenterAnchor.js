import React from 'react'
import Anchor from './Anchor'

class CenterAnchor extends Anchor {

    update = () => {
        if (this.props.element) {
            console.log(this.props.element().getClientRect().width);
            
            let elementRect = this.props.element().getClientRect()
            let x = this.props.element().x()
            let y = this.props.element().y()
            let newX = - elementRect.width / 2
            let newY = - elementRect.height / 2

            if (x !== newX || y !== newY) {
                this.props.change(newX, newY)
            }
        }
    }
}

export default CenterAnchor