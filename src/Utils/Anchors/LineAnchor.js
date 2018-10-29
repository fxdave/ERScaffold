import Anchor from './Abstract/Anchor'
class LineAnchor extends Anchor {
    constructor(line, props) {
        super()

        this.props = props
        this.line = line
        if(!props.to.element.shape || !props.from.element.shape) {
            console.error('LineAchor: elements must have shape')
        } else {
            props.to.element.shape.addEventListener('updated:position', () => {
                this.update()
            })
            props.from.element.shape.addEventListener('updated:position', () => {
                this.update()
            })
            props.from.element.shape.addEventListener('dragmove', () => {
                this.update()
            })
        }
    }

    update() {
        this.line.shape.points([
            this.props.from.element.shape.x(),
            this.props.from.element.shape.y(),
            this.props.to.element.shape.x(),
            this.props.to.element.shape.y()
        ])
    }
}
export default LineAnchor