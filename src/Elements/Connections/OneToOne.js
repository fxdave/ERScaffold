import Connection from './Connection'
import One from './One'
class OneToOne extends Connection {
    constructor(props) {
        super(props)

        this.fromOne = new One()

        this.toOne = new One()

        this.add(this.fromOne)
        this.add(this.toOne)
    
        this.update()

    }

}

export default OneToOne