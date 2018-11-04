import Element from '../../../Utils/Element'
import LineAnchor from '../../../Utils/Anchors/LineAnchor'

class Connection extends Element {
    constructor(from, to) {
        super()
        this.from = from
        this.to = to
    }

    onDelete() {
        this.remove()
    }

    hasFrom(entity) {
        return this.from == entity
    }

    hasTo(entity) {
        return this.to == entity
    }

    hasParticipant(entity) {
        if(this.from == entity || this.to == entity) 
            return true
        return false
    }


    setAnchor(fromEntity, toEntity) {

        let fromLine = this.getShape('from'),
            toLine = this.getShape('to'),
            relation = this.getShape('relation')

        this.anchor = new LineAnchor(fromLine, {
            watch: {
                from: fromEntity,
                to: toEntity,
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
                fromLine.change(from,rel,to, 1)
                toLine.change(to,rel,from, -1)

            }
        })
        this.redraw()
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


    getHalf(from,to) {
        return {
            x: (from.x + to.x) / 2 ,
            y: (from.y + to.y) / 2
        }
    }
}

export default Connection