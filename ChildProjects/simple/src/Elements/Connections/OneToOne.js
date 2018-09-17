

class __OneToOne extends Elements.Connections.Connection {
    constructor(props) {
        super(props)

        this.fromOne = new Elements.Connections.One()

        this.toOne = new Elements.Connections.One()

        this.add(this.fromOne)
        this.add(this.toOne)
    
        this.update()

    }


}

Elements.Connections.OneToOne = __OneToOne
