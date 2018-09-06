/**
 * Created by David Judge
 */
class TextInput extends createjs.Container {
    constructor(w,h) {
      //init
      super()

      this.w = w
      this.h = h

      //default
      this.font =  '18px Arial'
      this.color = '#fff'

      //padding
      this.padding = 3

      //create an input element
      this.input = this._createHTMLElement()

      //register evenets
      this.input.onkeyup = this._handleKeyUp.bind(this)

      //set default value
      this.value = ""

      //create text element

      this.text = new createjs.Text("",this.font, this.color)
      this.text.y = this.padding
      this.text.x = this.padding
      this.bg = new createjs.Shape()

      this.bg.graphics.beginFill("rgb(255,255,255)").rect(0,0,w,h);
      this.bg.alpha = 0.01
      this.addChild(this.bg,this.text)
      this.text.alpha = 0
      this.bg.addEventListener('dblclick',this._handleDblClick.bind(this))
      this.text.addEventListener('dblclick',this._handleDblClick.bind(this))

    }

    _createHTMLElement() {
      let input = document.createElement('input')

      input.type = 'text'
      input.value = "hello world!"

      //styling the input
      input.style.position = 'fixed'
      input.style.width = this.w-2*this.padding +'px'
      input.style.height = this.h-2*this.padding +'px'
      input.style.left = this.x + 'px'
      input.style.top = this.y + 'px'
      input.style.zIndex = "100"
      input.style.background = 'none'
      input.style.border = 'none'
      input.style.color = this.color
      input.style.font = this.font
      input.style.padding = this.padding+ 'px'

      document.body.appendChild(input)
      input.focus();
      return input
    }

    _handleKeyUp(e) {
      if(e.key == "Enter")
        this.hide()
      this.value = this.input.value
      this.text.text = this.value
    }

    _handleDblClick(e) {
      this.show()
    }

    show() {
      this.input.style.display = "block"
      this.text.alpha = 0
    }

    hide() {
      this.input.style.display = "none"
      this.text.alpha = 1
    }

    update() {
      if(this.input){
        this.input.style.left = this.x + 'px'
        this.input.style.top = this.y + 'px'
        this.input.style.color = this.color
        this.input.style.font = this.font
      }
    }

}