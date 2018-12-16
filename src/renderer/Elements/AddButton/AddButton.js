import Element from '../../Utils/Element'
import AddButtonShape from './AddButtonShape'
import AddButtonStyle from './AddButtonStyle'
class AddButton extends Element {
    constructor() {
        super()
        this.style = AddButtonStyle
        this.shape = AddButtonShape()
    }
}
export default AddButton