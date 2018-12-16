import ManyToManyConnectionShape from './ManyToManyConnectionShape'
import ManyToManyConnectionStyle from './ManyToManyConnectionStyle'
import ConnectionLayer from '../../Layers/ConnectionLayer'
import Connection from '../Abstract/Connection/Connection'

class ManyToManyConnection extends Connection {
    constructor(from, to) {
        super(from,to)

        this.layer = ConnectionLayer
        this.shape = ManyToManyConnectionShape()
        this.style = ManyToManyConnectionStyle
        
        this.model.connectionType = 'ManyToMany'
    }
}

export default ManyToManyConnection