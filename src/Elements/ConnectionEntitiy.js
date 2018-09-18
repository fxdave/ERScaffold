class __ConnectionEntity extends Konva.Group {
    constructor(props) {
        super(props)
        
        this.bg = new Konva.RegularPolygon({
            sides: 4,
            radius: 10,
            stroke: 'black',
            strokeWidth: 1,
            fill:'#fff'
          });

        this.text = new Elements.EditableText()

        this.add(this.bg,this.text)

        this.bg.on("dblclick",e => {
            e.cancelBubble = true;
            this.text.editText()
            this.centering()
        })

    }

    centering() {
        this.text.x(-this.text.width()/2)
        this.text.y(-this.text.height()/2)

        this.bg.radius(this.text.width())

        _V.connectionEntityLayer.draw()
    }
}

Elements.ConnectionEntity = __ConnectionEntity