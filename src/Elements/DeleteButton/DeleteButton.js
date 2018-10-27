import Element from '../../Utils/Element'
import DeleteButtonShape from './DeleteButtonShape'
import DeleteButtonStyle from './DeleteButtonStyle';
class DeleteButton extends Element {
    constructor() {
        super()
        this.shape = DeleteButtonShape()
        this.style = DeleteButtonStyle
    }
}
export default DeleteButton