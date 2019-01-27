import Anchor from './Abstract/Anchor'
import EventHelper from '../EventHelper'
class LineAnchor extends Anchor {
    constructor(line, props) {
        super(line)

        props.watch = Object.values(props.watch)
        this.props = props
        this.line = line
        if (props.watch.filter(v => {return v.getStage()}).length != props.watch.length) {
            console.error('LineAchor: elements must have shape')
        } else {
            if(props.update) {
                props.update(...props.watch) 
                EventHelper.on(['updated:position', 'dragmove'], props.watch.map(v => {return v.getStage()}), () => {
                    props.update(...props.watch) 
                    super.update()
                })
            } else {
                EventHelper.on(['updated:position', 'dragmove'], props.watch.map(v => {return v.getStage()}), () => {
                    this.update()
                })
            }

            super.update()

        }
    }

    async update() {
        this.line.getStage().points([
            this.props.watch[0].getStage().x(),
            this.props.watch[0].getStage().y(),
            this.props.watch[1].getStage().x(),
            this.props.watch[1].getStage().y()
        ])
        this.line.$emit('updated:shape')
        super.update()
    }
}
export default LineAnchor