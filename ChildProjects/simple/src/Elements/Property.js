

class __Property extends Konva.Group {
    constructor(props) {
        super({
            ...props,
            draggable: true
        })


        this.circle = new Konva.Ellipse({
            radius: {
                x: 30,
                y: 20
            },
            fill: '#fff',
            stroke: 'black',
            strokeWidth: 1
        });

        this.text = new Elements.EditableText({
            x: -3,
            y: -6,
            fontSize: 14,
            text: 'Name',
            fill: '#000'
        })

        this.deleteButton = new Elements.DeleteButton()

        this.line = new Konva.Line({
            points: [0, 0, 0, 0],
            stroke: 'black',
            strokeWidth: 1,
        })

        this.direct({
            x: 0,
            y: 0
        })


        this.deleteButton.on("click", e => {
            console.log("Delete property");
            this.dispatchEvent(new Event('delete'));
        })
        this.deleteButton.opacity(0)

        this.text.addEventListener("change", e => {
            this.update()
        })

        this.addEventListener("arrange", e => {
            this.update()
        })

        this.addEventListener("dragmove", e => {
            this.update()
        })

        this.on("mouseover", e => {
            this.deleteButton.opacity(1)
        })
        this.on("mouseleave", e=> {
            this.deleteButton.opacity(0)
        })

        this.optimalDistanceSquare = Math.pow(30,2)
        this.add(this.line, this.circle, this.text, this.deleteButton)
    }

    update() {
        this.direct({ x: 0, y: 0 })
    }

    direct(to) {
        this.line.points([0, 0, to.x - this.x(), to.y - this.y()])

        //centering the text
        this.text.x(-this.text.width() / 2)
        this.text.y(-this.text.height() / 2)

        this.circle.radius({
            x: this.text.width() + 10,
            y: 20
        })

        this.deleteButton.x(this.circle.width()/2/1.41)
        this.deleteButton.y(-this.circle.height()/2/1.41)
    }

    
    getNearestPoint(to) {
        let abs = this.getAbsolutePosition()
        let x = abs.x,
            y = abs.y,
            w = this.circle.radius().x,
            h = this.circle.radius().y

        let LTC = {
            x,y
        }

        let RBC = {
            x: x+ w,
            y: y+ h
        }

        let x_out,y_out

        let centerX = false
        let centerY = false

        if(to.x <= LTC.x) {
            x_out = LTC.x
        } else if(to.x > LTC.x && to.x < RBC.x) {
            x_out = to.x
            centerX = true
        } else if (to.x >= RBC.x) {
            x_out = RBC.x
        }

        if(to.y <= LTC.y) {
            y_out = LTC.y
        } else if(to.y > LTC.y && to.y < RBC.y) {
            y_out = to.y
            centerY = true
        } else if (to.y >= RBC.y) {
            y_out = RBC.y
        }

/*
        if(centerX && centerY) {
            x_out = x+w/2
            y_out = y+h/2
        }
*/
        return {
            x: x_out,
            y: y_out
        }
    }


}

Elements.Property = __Property
