import Element from '../../Utils/Element'
import Konva from '../../Vendor/Konva'
class EditableText extends Element {
    constructor() {
        super()
        this.shape = new Konva.Text({
            text: ''
        })
    }

    edit() {
        let val = ''
        this._setInputField()
        document.querySelector('#ask').addEventListener('submit', (e) => {
            e.preventDefault()
            val = this._getInputField().value
            this._deleteInputField()
    
            if (val != '')
                this.shape.text(val)
            else
                this.shape.text('empty')
            
            this.shape.dispatchEvent(new Event('updated:width'))
            this.shape.dispatchEvent(new Event('updated:text'))
            this.redraw()
        })
    }

    setText(text) {
        this.shape.text(text)
        this.shape.dispatchEvent(new Event('updated:width'))
        this.shape.dispatchEvent(new Event('updated:text'))
    }

    getText() {
        return this.shape.text()
    }

    _setInputField() {
        document.querySelector('#temp').innerHTML += `
            <div id="ask">
                <form>
                    <input type="text" placeholder="typeTheName">
                </form>
            </div>
        `
        document.querySelector('#konva').style.filter = 'blur(2px)'
        this._getInputField().focus()
    }

    _getInputField() {
        return document.querySelector('#ask input')
    }

    _deleteInputField() {
        document.querySelector('#konva').style.filter = 'blur(0)'
        var e = document.querySelector('#ask')
        if(e)
            e.remove()
    }
}
export default EditableText