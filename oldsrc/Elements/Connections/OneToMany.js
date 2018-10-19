import Connection from './Connection'
import Many from './Many'
import One from './One'
class OneToMany extends Connection {
    constructor(props) {
        super(props)

        this.fromOne = new One()

        this.toOne = new Many()

        this.add(this.fromOne)
        this.add(this.toOne)
    
        this.fromOne.setZIndex(0)
        this.toOne.setZIndex(0)
        
        this.update()

    }
}


export default OneToMany