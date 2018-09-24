
let stage = new Konva.Stage({
    container: 'konva',   // id of container <div>
    width: window.innerWidth,
    height: window.innerHeight
})
let layer = new Konva.Layer()
let layer2 = new Konva.Layer()
stage.add(layer,layer2)

let group = new Konva.Group({})
layer.add(group)
let group2 = new Konva.Group({})
layer2.add(group2)

let box = new Konva.Rect({
    x:100,y:100
})
group.box = group.add(box)


let box2 = new Konva.Rect({
    x:400,y:100
})
group2.add(box2)


const ButtonStyle = new Style.Class({
    children: {
        box : new Style.Class({
            width: 100,
            height: 100,
            fill: '#000',
            duration: 0.2,
            easing:'EaseOut',
            cursor:'pointer',
            hover: {
                opacity: 0.2
            },
            click: {
                fill: "#f00"
            }
        })
    }
})


ButtonStyle.apply(group)

layer.draw()