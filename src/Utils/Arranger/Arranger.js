
import BoundingBox from './BoundingBox'
class Arranger {

    constructor() {
        this.arrangables = []
        this.speed = 3
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
        if (!element.shape._arrangerBoundingType)
            element.shape._arrangerBoundingType = BoundingBox
        if (!element.shape._arrangerMinimalSpace)
            element.shape._arrangerMinimalSpace = 1000
        if (!element.shape._arrangerMinimalRawSpace)
            element.shape._arrangerMinimalRawSpace = element.shape._arrangerMinimalSpace*9
    }

    tick() {
        this.arrangables.forEach(ref => {
            let summary = this.arrangables
                .filter(v => {
                    let dsr = this.distanceSquareRaw(v, ref)
                    return dsr < v.shape._arrangerMinimalRawSpace 
                    || dsr < ref.shape._arrangerMinimalRawSpace
                }).filter(v => {
                    let ds = this.distanceSquare(v, ref)
                    return ds < v.shape._arrangerMinimalSpace 
                    || ds < ref.shape._arrangerMinimalSpace
                }).filter(v => {
                    return v != ref && v.shape.parent.parent != ref.shape
                }).reduce((acc, v) => {
                    let refAbs = ref.shape.getAbsolutePosition()
                    let vAbs = v.shape.getAbsolutePosition()
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
        
        let length = Math.sqrt(Math.pow(direction.x,2)+Math.pow(direction.y,2))
        let dir = {
            x: direction.x / length,
            y: direction.y / length
        }

        if(!isNaN(dir.x) && !isNaN(dir.y)) {
            element.shape.x(element.shape.x() + dir.x * this.speed)
            element.shape.y(element.shape.y() + dir.y * this.speed)
            element.shape.dispatchEvent(new Event('updated:position'))
        } else {

            element.shape.x(element.shape.x() + (Math.random()-0.5) * this.speed)
            element.shape.y(element.shape.y() + (Math.random()-0.5) * this.speed)
            element.shape.dispatchEvent(new Event('updated:position'))
        }
    }

    distanceSquare(fromElement, toElement) {
        let abs = toElement.shape.getAbsolutePosition()
        let near1 = fromElement.shape._arrangerBoundingType(fromElement,abs)
        let near2 = toElement.shape._arrangerBoundingType(toElement,near1)

        return Math.pow(near1.x - near2.x, 2)
            + Math.pow(near1.y - near2.y, 2)
    }

    distanceSquareRaw(fromElement, toElement) {
        let abs1 = fromElement.shape.getAbsolutePosition()
        let abs2 = toElement.shape.getAbsolutePosition()

        return Math.pow(abs1.x - abs2.x, 2)
            + Math.pow(abs1.y - abs2.y, 2)
    }


}

export default new Arranger