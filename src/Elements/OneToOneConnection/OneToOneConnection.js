import Element from '../../Utils/Element'
import OneToOneConnectionShape from './OneToOneConnectionShape'
import OneToOneConnectionStyle from './OneToOneConnectionStyle'
import ConnectionLayer from '../../Layers/ConnectionLayer'
import LineAnchor from '../../Utils/Anchors/LineAnchor'

class OneToOneConnection extends Element {
    constructor(one, many) {
        super()
        this.one = one
        this.many = many

        this.layer = ConnectionLayer
        this.shape = OneToOneConnectionShape()
        this.style = OneToOneConnectionStyle
    }

    onDelete() {
        this.remove()
    }

    mounted() {
        this.setAnchor(this.one, this.many)
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
                one.change(from,half)
                many.change(half, to)

                relation.shape.x(half.x)
                relation.shape.y(half.y)
            }
        })
        this.redraw()
    }


    hasFrom(entity) {
        return this.one == entity
    }

    hasTo(entity) {
        return this.many == entity
    }

    hasParticipant(entity) {
        if(this.one == entity || this.many == entity) 
            return true
        return false
    }

    getHalf(from,to) {
        return {
            x: (from.x + to.x) / 2 ,
            y: (from.y + to.y) / 2
        }
    }
}

export default OneToOneConnection