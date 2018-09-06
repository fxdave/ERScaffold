
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

    let input = new TextInput(100,30)
    input.x = 100
    input.y = 100
    input.update()
    storage.data.stage.addChild(input)
    storage.elements.canvas.el.addEventListener("click", (e) => {

    });

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", () => { 
        storage.data.stage.update();
    });
}