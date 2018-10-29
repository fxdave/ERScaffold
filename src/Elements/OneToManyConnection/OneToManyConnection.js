import Element from '../../Utils/Element'
import OneToManyConnectionShape from './OneToManyConnectionShape'
import OneToManyConnectionStyle from './OneToManyConnectionStyle'
import ConnectionLayer from '../../Layers/ConnectionLayer'
import LineAnchor from '../../Utils/Anchors/LineAnchor'

class OneToManyConnection extends Element {
    constructor() {
        super()
        this.layer = ConnectionLayer
        this.shape = OneToManyConnectionShape()
        this.style = OneToManyConnectionStyle
    }

    setAnchor(one, many) {
        this.anchor = new LineAnchor(this.getShape('one'), {
            from: {
                element: one,
            },
            to: {
                element: many
            }
        })
        this.anchor.update()
        this.redraw()
    }
}

export default OneToManyConnection