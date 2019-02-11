
import BoundingBox from './BoundingBox'

class Arranger {

    constructor() {
        this.arrangables = []
        this.speed = 3
    }

    /**
     * 
     * @param {Object} element
     * @param {Object} element
     */
    add(element) {
        console.log(element);
        this.setDefaultsFor(element)
        this.arrangables.push(element)
    }

    /**
     * 
     * @param {Object} element
     * @param {Object} element
     */
    remove(element) {
        
        this.arrangables = this.arrangables.filter(v => {
            return v.id != element.id
        })
    }

    setDefaultsFor(element) {
        if (!element._arrangerManuallyCentered)
            element._arrangerManuallyCentered = false
        if (!element._arrangerBoundingType)
            element._arrangerBoundingType = BoundingBox
        if (!element._arrangerMinimalSpace)
            element._arrangerMinimalSpace = 1000
        if (!element._arragnerUpdate)
            element._arragnerUpdate = () => { }
        if (!element._arrangerMinimalRawSpace)
            element._arrangerMinimalRawSpace = element._arrangerMinimalSpace * 9
    }

    tick() {
        this.arrangables.forEach(ref => {
            let summary = this.arrangables
                .filter(v => {
                    let dsr = this.distanceSquareRaw(v, ref)
                    return dsr < v._arrangerMinimalRawSpace
                        || dsr < ref._arrangerMinimalRawSpace
                }).filter(v => {
                    let ds = this.distanceSquare(v, ref)
                    return ds < v._arrangerMinimalSpace
                        || ds < ref._arrangerMinimalSpace
                }).filter(v => {
                    return v != ref && v.parent.parent != ref
                }).reduce((acc, v) => {
                    let refAbs = ref.getAbsolutePosition()
                    let vAbs = v.getAbsolutePosition()
                    return {
                        sum: {
                            x: acc.sum.x + refAbs.x - vAbs.x,
                            y: acc.sum.y + refAbs.y - vAbs.y,
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

        let length = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2))
        let dir = {
            x: direction.x / length,
            y: direction.y / length
        }

        if (!isNaN(dir.x) && !isNaN(dir.y)) {
            element.x(element.x() + dir.x * this.speed)
            element.y(element.y() + dir.y * this.speed)
            element._arragnerUpdate()
        } else {

            element.x(element.x() + (Math.random() - 0.5) * this.speed)
            element.y(element.y() + (Math.random() - 0.5) * this.speed)
            element._arragnerUpdate()
        }
    }

    distanceSquare(fromElement, toElement) {
        let abs = toElement.getAbsolutePosition()
        let near1 = fromElement._arrangerBoundingType(fromElement, abs)
        let near2 = toElement._arrangerBoundingType(toElement, near1)

        return Math.pow(near1.x - near2.x, 2)
            + Math.pow(near1.y - near2.y, 2)
    }

    distanceSquareRaw(fromElement, toElement) {
        let abs1 = fromElement.getAbsolutePosition()
        let abs2 = toElement.getAbsolutePosition()

        return Math.pow(abs1.x - abs2.x, 2)
            + Math.pow(abs1.y - abs2.y, 2)
    }


}

export default new Arranger