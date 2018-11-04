import OneToManyConnectionShape from './OneToManyConnectionShape'
import OneToManyConnectionStyle from './OneToManyConnectionStyle'
import ConnectionLayer from '../../Layers/ConnectionLayer'
import LineAnchor from '../../Utils/Anchors/LineAnchor'
import Connection from '../Abstract/Connection/Connection'

class OneToManyConnection extends Connection {
    constructor(from, to) {
        super(from,to)

        this.layer = ConnectionLayer
        this.shape = OneToManyConnectionShape()
        this.style = OneToManyConnectionStyle
    }

    onDelete() {
        this.remove()
    }

    mounted() {
        this.setAnchor(this.from, this.to)

        let half = this.getHalf({
            x: this.from.shape.x(),
            y: this.from.shape.y()
        }, {
            x: this.to.shape.x(),
            y: this.to.shape.y()
        })

        this.getShape('relation').shape.x(half.x)
        this.getShape('relation').shape.y(half.y)
    }

    setAnchor(oneEntity, manyEntity) {

        let one = this.getShape('one'),
            many = this.getShape('many'),
            relation = this.getShape('relation')

        this.anchor = new LineAnchor(this.getShape('one'), {
            watch: {
                from: oneEntity,
                to: manyEntity,
                relation,
            },
            /**
             * 
             * @param {Element} from 
             * @param {Element} to 
             */
            update: (from, to, relation) => {

                from = {
                    x: from.shape.x(),
                    y: from.shape.y()
                }

                to = {
                    x: to.shape.x(),
                    y: to.shape.y()
                }

                let rel = {
                    x: relation.shape.x(),
                    y: relation.shape.y()
                }
                one.change(from,rel,to)
                many.change(rel, to)

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

export default OneToManyConnection