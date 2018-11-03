import ManyToManyConnectionShape from './ManyToManyConnectionShape'
import ManyToManyConnectionStyle from './ManyToManyConnectionStyle'
import ConnectionLayer from '../../Layers/ConnectionLayer'
import LineAnchor from '../../Utils/Anchors/LineAnchor'
import Connection from '../Abstract/Connection/Connection'

class ManyToManyConnection extends Connection {
    constructor(from, to) {
        super(from,to)

        this.layer = ConnectionLayer
        this.shape = ManyToManyConnectionShape()
        this.style = ManyToManyConnectionStyle
    }

    onDelete() {
        this.remove()
    }

    mounted() {
        this.setAnchor(this.from, this.to)
    }

    setAnchor(one, many) {
        this.anchor = new LineAnchor(this.getShape('one'), {
            from: {
                element: one,
            },
            to: {
                element: many
            },
            /**
             * 
             * @param {Element} from 
             * @param {Element} to 
             */
            update: (from, to) => {
                let one = this.getShape('one'),
                    many = this.getShape('many'),
                    relation = this.getShape('relation')

                from = {
                    x: from.shape.x(),
                    y: from.shape.y()
                }

                to = {
                    x: to.shape.x(),
                    y: to.shape.y()
                }

                let half = this.getHalf(from,to)
                one.change(half,from)
                many.change(half, to)

                relation.shape.x(half.x)
                relation.shape.y(half.y)
            }
        })
        this.redraw()
    }

    getHalf(from,to) {
        return {
            x: (from.x + to.x) / 2 ,
            y: (from.y + to.y) / 2
        }
    }
}

export default ManyToManyConnection