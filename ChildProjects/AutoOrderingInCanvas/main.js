const storage = {
    elements : {
        canvas : {
            id : 'main_canvas',
            el : null
        },
        points: []
    },
    data : {
        stage : null
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

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", ()=>{arrange()});
}

function addPoint(x,y) {
    var circle = new createjs.Shape()
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 1)
    circle.x = x
    circle.y = y
    storage.data.stage.addChild(circle)
    storage.data.stage.update()
    storage.elements.points.push(circle)

}

function arrange(){
    if(storage.elements.points.length < 2)
    return

    storage.elements.points.forEach((current,currentID) => {
        let sumX = -current.x, sumY = -current.y

        let n = -1
        storage.elements.points.forEach((val) => {
            if( Math.pow(current.x-val.x,2) + Math.pow(current.y-val.y,2) < 200) {
                sumX += val.x
                sumY += val.y
                n++
            }
        });

        if(n < 1 )
        return

        let vecX = current.x - sumX/n,
            vecY = current.y - sumY/n 
        
        let length = Math.sqrt(Math.pow(vecX,2) + Math.pow(vecY,2))

        current.x += vecX / length
        current.y += vecY / length
    });
    
    
    
    storage.data.stage.update();
}