

class __ManyToMany extends Elements.Connections.Connection {
    constructor(props) {
        super(props)

        this.fromOne = new Elements.Connections.Many()

        this.toOne = new Elements.Connections.Many()

        this.add(this.fromOne)
        this.add(this.toOne)
    
        this.update()

    }


}

Elements.Connections.ManyToMany = __ManyToMany
