import Anchor from './Abstract/Anchor'
import EventHelper from '../EventHelper'
class LineAnchor extends Anchor {
    constructor(line, props) {
        super(line)

        props.watch = Object.values(props.watch)
        this.props = props
        this.line = line
        if (props.watch.filter(v => {return v.shape}).length != props.watch.length) {
            console.error('LineAchor: elements must have shape')
        } else {
            if(props.update) {
                props.update(...props.watch) 
                EventHelper.on(['updated:position', 'dragmove'], props.watch.map(v => {return v.shape}), () => {
                    props.update(...props.watch) 
                    super.update()
                })
            } else {
                EventHelper.on(['updated:position', 'dragmove'], props.watch.map(v => {return v.shape}), () => {
                    this.update()
                })
            }

            super.update()

        }
    }

    async update() {
        this.line.shape.points([
            this.props.watch[0].shape.x(),
            this.props.watch[0].shape.y(),
            this.props.watch[1].shape.x(),
            this.props.watch[1].shape.y()
        ])
        this.line.shape.dispatchEvent(new Event('updated:shape'))
        super.update()
    }
}
export default LineAnchor