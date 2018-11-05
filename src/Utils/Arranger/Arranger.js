
import BoundingBox from './BoundingBox'
class Arranger {

    constructor() {
        this.arrangables = []
    }

    add(element) {
        this.setDefaultsFor(element)
        this.arrangables.push(element)
        element.addEventListener('remove', () => {
            this.remove(element)
        })
    }

    remove(element) {
        this.arrangables = this.arrangables.filter(v => {
            return v != element
        })
    }

    setDefaultsFor(element) {
        if (!element._arrangerBoundingType)
            element._arrangerBoundingType = BoundingBox
        if (!element._arrangerMinimalSpace)
            element._arrangerMinimalSpace = 4000
    }

    tick() {
        this.arrangables.forEach(ref => {
            let summary = this.arrangables.filter(v => {
                return v != ref
                    && (this.distanceSquare(v, ref) < v._arrangerMinimalSpace
                    || this.distanceSquare(v, ref) < ref._arrangerMinimalSpace)
            }).reduce((acc, v) => {
                return {
                    sum: {
                        x: acc.sum.x + ref.shape.x() - v.shape.x(),
                        y: acc.sum.y + ref.shape.y() - v.shape.y(),
                    },
                    counter: acc.counter + 1
                }
            }, { sum: { x: 0, y: 0 }, counter: 0 })

            if (summary.counter > 0) {
                let avg = {
                    x: summary.sum.x / summary.counter,
                    y: summary.sum.y / summary.counter
                }

                this.moveElement(ref, avg)
            }

        })
    }

    moveElement(element, direction) {
        
        let length = Math.sqrt(Math.pow(direction.x,2)+Math.pow(direction.y,2))
        let dir = {
            x: direction.x / length,
            y: direction.y / length
        }
        element.shape.x(element.shape.x() + dir.x)
        element.shape.y(element.shape.y() + dir.y)

    }

    distanceSquare(fromElement, toElement) {
        let abs = toElement.shape.getAbsolutePosition()
        let near1 = fromElement._arrangerBoundingType.getNearestPoint(fromElement,abs)
        let near2 = fromElement._arrangerBoundingType.getNearestPoint(toElement,near1)

        return Math.pow(near1.x - near2.x, 2)
            + Math.pow(near1.y - near2.y, 2)
    }


}

export default new Arranger