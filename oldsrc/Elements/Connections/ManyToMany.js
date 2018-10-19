import Connection from './Connection'
import Many from './Many'

class ManyToMany extends Connection {
    constructor(props) {
        super(props)

        this.fromOne = new Many()

        this.toOne = new Many()

        this.add(this.fromOne)
        this.add(this.toOne)
        
        this.fromOne.setZIndex(0)
        this.toOne.setZIndex(0)

        this.update()

    }


}

export default ManyToMany