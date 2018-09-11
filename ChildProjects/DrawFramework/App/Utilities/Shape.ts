class Shape extends createjs.Shape {
    get tween() {
        return createjs.Tween.get(this, { override: true })
    }
}

export default Shape