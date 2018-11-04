import OneToManyConnectionShape from './OneToManyConnectionShape'
import OneToManyConnectionStyle from './OneToManyConnectionStyle'
import ConnectionLayer from '../../Layers/ConnectionLayer'
import LineAnchor from '../../Utils/Anchors/LineAnchor'
import Connection from '../Abstract/Connection/Connection'

class OneToManyConnection extends Connection {
    constructor(from, to) {
        super(from,to)

        this.layer = ConnectionLayer
        this.shape = OneToManyConnectionShape()
        this.style = OneToManyConnectionStyle
    }
}

export default OneToManyConnection