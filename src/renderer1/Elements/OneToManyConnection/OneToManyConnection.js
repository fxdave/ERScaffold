import OneToManyConnectionShape from './OneToManyConnectionShape'
import OneToManyConnectionStyle from './OneToManyConnectionStyle'
import ConnectionLayer from '../../Layers/ConnectionLayer'
import Connection from '../Abstract/Connection/Connection'

class OneToManyConnection extends Connection {
    constructor(from, to) {
        super(from, to)

        this.layer = ConnectionLayer
        this.shape = OneToManyConnectionShape()
        this.style = OneToManyConnectionStyle

        this.model.connectionType = 'OneToMany'
    }
}

export default OneToManyConnection