import OneToOneConnectionShape from './OneToOneConnectionShape'
import OneToOneConnectionStyle from './OneToOneConnectionStyle'
import ConnectionLayer from '../../Layers/ConnectionLayer'
import Connection from '../Abstract/Connection/Connection'

class OneToOneConnection extends Connection {
    constructor(from, to) {
        super(from, to)

        this.layer = ConnectionLayer
        this.shape = OneToOneConnectionShape()
        this.style = OneToOneConnectionStyle

        this.model.connectionType = 'OneToOne'
    }
}

export default OneToOneConnection