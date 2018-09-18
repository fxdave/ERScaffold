const Viewport = function () {
    this.initKonva()
    this.setEvenetListeners()
}

Viewport.prototype.setEvenetListeners = function () {
    this.stage.addEventListener('dragstart', (e) => {
        console.log("moving");
    })
    this.stage.addEventListener('dblclick', (e) => {
        console.log("add entity");
        this.addEntityTo(e.clientX, e.clientY)
    })
    this.stage.on("drop", (e) => {
        console.log(e)
    })
}

Viewport.prototype.addEntityTo = function (x, y) {
    const E = new Elements.Entity({
        x: x - this.stage.x(),
        y: y - this.stage.y()
    })
    E.addEventListener("delete", () => {
        E.remove()
        this.arranger.remove(E)
        this.entityLayer.draw()
    })
    this.entityLayer.add(E)
    this.arranger.add(E)
    console.log(this.entityLayer)
    this.entityLayer.draw()
}


Viewport.prototype.arranger = new Arranger()

Viewport.prototype.stage = new Konva.Stage({
    draggable: true,
    container: 'konva',   // id of container <div>
    width: window.innerWidth,
    height: window.innerHeight
});

Viewport.prototype.entityLayer = null

Viewport.prototype.initKonva = function () {
    this.entityLayer = new Konva.Layer()
    this.tempLayer = new Konva.Layer()
    this.connectionLayer = new Konva.Layer()
    this.connectionEntityLayer = new Konva.Layer()
    this.stage.add(this.tempLayer)
    this.stage.add(this.connectionLayer)
    this.stage.add(this.entityLayer)
    this.stage.add(this.connectionEntityLayer)
    /*
    var anim = new Konva.Animation(function(frame) {
        var time = frame.time,
            timeDiff = frame.timeDiff,
            frameRate = frame.frameRate;
    }, this.entityLayer);
    */
}

Viewport.prototype.addConnection = function (from, to, type = "hasMany") {
    if (from instanceof Elements.Entity && to instanceof Elements.Entity) {

        let connection = null

        let ret = false
        this.connectionLayer.children.forEach(v => {
            if (v.from == to && v.to == from) {
                if (v instanceof Elements.Connections.OneToOne) {
                    // if not one to one then action
                    if (type != "hasOne")
                        v.remove()
                    else
                        ret = true
                } else if (v instanceof Elements.Connections.OneToMany) {
                    // if not one to one and not belongsTo then action
                    if (type == "hasMany") {
                        v.remove()
                        type = "belongsToMany"
                    }
                    else
                        ret = true
                } else if (v instanceof Elements.Connections.ManyToMany) {
                    ret = true
                }
            } else if (v.from == from && v.to == to) {
                if (v instanceof Elements.Connections.OneToOne) {
                    // if not one to one then action
                    if (type != "hasOne")
                        v.remove()
                    else
                        ret = true
                } else if (v instanceof Elements.Connections.OneToMany) {
                    // if not one to one and not belongsTo then action
                    if (type == "belongsTo") {
                        v.remove()
                        type = "belongsToMany"
                    } else {
                        ret = true
                    }
                } else if (v instanceof Elements.Connections.ManyToMany) {
                    ret = true
                }
            }
        })

        if(ret) return

        switch (type) {
            case "hasOne":
                connection = new Elements.Connections.OneToOne({
                    from: from,
                    to: to
                })
                break
            case "hasMany":
                connection = new Elements.Connections.OneToMany({
                    from: from,
                    to: to
                })
                break
            case "belongsTo":
                connection = new Elements.Connections.OneToMany({
                    from: to,
                    to: from
                })
                break
            case "belongsToMany":
                connection = new Elements.Connections.ManyToMany({
                    from,
                    to
                })
                break
        }

        if (connection === null) return

        connection.addEventListener("delete", () => {
            connection.remove()
            this.connectionLayer.draw()
        })


        this.connectionLayer.add(connection)
        this.connectionLayer.draw()

    } else {
        console.error("Adding connection is failed due to parameters are not entities", from, to)
    }
}

const _V = new Viewport()

let anim = new Konva.Animation(frame => {
    _V.arranger.tick()
}, _V.entityLayer)
anim.start()

// handle event
window.addEventListener("resize", function () {
    _V.stage.width(window.innerWidth)
    _V.stage.height(window.innerHeight)
});