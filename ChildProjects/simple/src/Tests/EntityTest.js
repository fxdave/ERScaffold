const E = new Elements.Entity({
    x:0,
    y:0
})

let pass = true
let point,nearest


point = {x: 0 , y:-100}
nearest = E.getNearestPoint(point)
if(!(nearest.x == point.x && nearest.y > point.y && nearest.y < 0) ) {
    pass = false
}
point = {x: 0 , y:100}
nearest = E.getNearestPoint(point)
if(!(nearest.x == point.x && nearest.y < point.y && nearest.y > 0) ) {
    pass = false
}

point = {x: -100 , y:0}
nearest = E.getNearestPoint(point)
if(!(nearest.y == point.y && nearest.x > point.x && nearest.x < 0) ) {
    pass = false
}
point = {x: 100 , y:0}
nearest = E.getNearestPoint(point)
if(!(nearest.y == point.y && nearest.x < point.x && nearest.x > 0) ) {
    pass = false
}


point = {x: 10 , y:10}
nearest = E.getNearestPoint(point)
if(!(nearest.x == 0 && nearest.y == 0)){
    pass = false
}

point = {x: 100 , y:100}
nearest = E.getNearestPoint(point)
if(!(nearest.x > 0 && nearest.y > 0 && nearest.x < point.x && nearest.y < point.y)){
    pass = false
}

point = {x: -100 , y:100}
nearest = E.getNearestPoint(point)
if(!(nearest.x < 0 && nearest.y > 0 && nearest.x > point.x && nearest.y < point.y)){
    pass = false
}

point = {x: 100 , y:-100}
nearest = E.getNearestPoint(point)
if(!(nearest.x > 0 && nearest.y < 0 && nearest.x < point.x && nearest.y > point.y)){
    pass = false
}


point = {x: -100 , y:-100}
nearest = E.getNearestPoint(point)
if(!(nearest.x < 0 && nearest.y < 0 && nearest.x > point.x && nearest.y > point.y)){
    pass = false
}

if(pass) {
    console.log("test passed!")
} else {
    console.error("test failed!");
    
}