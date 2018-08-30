class Shape extends createjs.Shape {
    constructor(x,y) {
        super()
        this.x = x
        this.y = y
    }
    getNearestPointTo(to) {
        return {
            x: this.x,
            y: this.y,
            power:1
        }
    }
}

class Rectangle extends Shape {
    constructor(x,y,w,h) {
        super(x,y) 
        this.w = w;
        this.h = h;
        let wHalf = w/2
        let hHalf = h/2
        this.wHalf = wHalf
        this.hHalf = hHalf
        this.graphics.beginFill("DeepSkyBlue").rect(0-wHalf,0-hHalf,w,h);
        
    }
    getNearestPointTo(to) {
        //O is the center of the circle
        let top = this.y-this.hHalf,
            left = this.x-this.wHalf,
            right = this.x+this.wHalf,
            bottom = this.y+this.hHalf
            
        let Nx = 0
        if(to.x < left){
            Nx = left
        } else if( to.x < right) {
            Nx = to.x
        }  else {
            Nx = right
        }


        let Ny = 0
        if(to.y < top){
            Ny = top
        } else if( to.y < bottom) {
            Ny = to.y
        }  else {
            Ny = bottom
        }

        if(Nx == to.x && Ny == to.y) {
            return {
                x: this.x,
                y: this.y,
                power: 0
            }
        }

        return {
            x: Nx,
            y: Ny,
            power:0.5
        }
    }
}

class Circle extends Shape {
    constructor(x, y, r) {
        super(x,y)
        this.r = r
        this.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, r)
    }

    getNearestPointTo(to) {
        //O is the center of the circle

        //calc OP vector
        let OPx = to.x - this.x
        let OPy = to.y - this.y

        //normalize
        let l = Math.sqrt(Math.pow(OPx, 2) + Math.pow(OPy, 2))

        if (l != 0) {
            OPx /= l
            OPy /= l
        } else {
            OPx = 0
            OPy = 0
        }

        let Nx = this.x + OPx * this.r
        let Ny = this.y + OPy * this.r

        let NO_length = Math.sqrt(Math.pow(this.x - Nx, 2) + Math.pow(this.y - OPy, 2))
   
        if (NO_length > l) {

            return {
                x: this.x,
                y: this.y,
                power:1
            }
        }
        return {
            x: Nx,
            y: Ny,
            power:1
        }

    }
}


const storage = {
    elements: {
        canvas: {
            id: 'main_canvas',
            el: null
        },
        points: []
    },
    data: {
        stage: null
    }
}

function resize() {
    const canvas = storage.elements.canvas.el;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    storage.data.stage.update();
}

function init() {
    storage.data.stage = new createjs.Stage(storage.elements.canvas.id);
    storage.elements.canvas.el = document.getElementById(storage.elements.canvas.id)
    resize();

    storage.elements.canvas.el.addEventListener("click", (e) => {
        addPoint(e.clientX, e.clientY)
    });

    document.addEventListener("keyup", (e) => {
        addRectangle(200, 200)
    });
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", () => { arrange() });
}

function addPoint(x, y) {
    var circle = new Circle(x, y, 10)
    storage.data.stage.addChild(circle)
    storage.data.stage.update()
    storage.elements.points.push(circle)
}

function addRectangle(x, y) {
    var circle = new Rectangle(x, y, 100,100)
    storage.data.stage.addChild(circle)
    storage.data.stage.update()
    storage.elements.points.push(circle)
}

function arrange() {
    if (storage.elements.points.length < 2)
        return

    storage.elements.points.forEach((current, currentID) => {
        let sumX = -current.x, sumY = -current.y

        let n = -1
        storage.elements.points.forEach((val) => {
            let distance = val.getNearestPointTo(current)
            if ((Math.pow(current.x - distance.x, 2) + Math.pow(current.y - distance.y, 2)*distance.power) < 3000) {
                
                sumX += distance.x
                sumY += distance.y
                n++
            }
        });

        if (n < 1)
            return
        let AVGx = sumX /n,
            AVGy = sumY /n

        let Cnear = current.getNearestPointTo({x: AVGx , y: AVGy})
        let vecX = Cnear.x - AVGx,
            vecY = Cnear.y - AVGy

        let length = Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2))

        current.x += vecX / length * 0.2
        current.y += vecY / length * 0.2


    });



    storage.data.stage.update();
}