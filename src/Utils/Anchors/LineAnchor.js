import Anchor from './Abstract/Anchor'
import EventHelper from '../EventHelper'
class LineAnchor extends Anchor {
    constructor(line, props) {
        super(line)

        this.props = props
        this.line = line
        if (!props.to.element.shape || !props.from.element.shape) {
            console.error('LineAchor: elements must have shape')
        } else {
            if(props.update) {
                props.update(props.from.element,props.to.element) 
                EventHelper.on(['updated:position', 'dragmove'], [props.to.element.shape, props.from.element.shape], () => {
                    props.update(props.from.element,props.to.element) 
                    super.update()
                })
            } else {
                EventHelper.on(['updated:position', 'dragmove'], [props.to.element.shape, props.from.element.shape], () => {
                    this.update()
                })
            }

            super.update()

        }
    }

    async update() {
        this.line.shape.points([
            this.props.from.element.shape.x(),
            this.props.from.element.shape.y(),
            this.props.to.element.shape.x(),
            this.props.to.element.shape.y()
        ])
        this.line.shape.dispatchEvent(new Event('updated:shape'))
        super.update()
    }
}
export default LineAnchor