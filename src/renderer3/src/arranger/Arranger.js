
import BoundingBox from './BoundingBox'
import Konva from 'konva'

class Arranger {

    constructor() {
        this.arrangables = []
        this.speed = 3
    }

    /**
     * 
     * @param {Object} element
     * @param {Object} element.current
     */
    add(element) {
        this.setDefaultsFor(element.current)
        console.log(element);
        
        this.arrangables.push(element)
        this.onStart()
    }

    /**
     * 
     * @param {Object} element
     * @param {Object} element.current
     */
    remove(element) {

        this.arrangables = this.arrangables.filter(v => {
            return v.current._id != element.current._id
        })
    }

    setDefaultsFor(konvaObject) {
        if (!konvaObject._arrangerElementCentered)
            konvaObject._arrangerElementCentered = false
        if (!konvaObject._arrangerBoundingType)
            konvaObject._arrangerBoundingType = BoundingBox
        if (!konvaObject._arrangerMinimalSpace)
            konvaObject._arrangerMinimalSpace = 1000
        if (!konvaObject._arrangerUpdate)
            konvaObject._arrangerUpdate = () => { }
        if (!konvaObject._arrangerMinimalRawSpace)
            konvaObject._arrangerMinimalRawSpace = konvaObject._arrangerMinimalSpace * 9
    }

    tick() {
        
        this.arrangables.forEach(ref => {
            let summary = this.arrangables
                .filter(v => {
                    let dsr = this.distanceSquareRaw(v.current, ref.current)
                    return dsr < v.current._arrangerMinimalRawSpace
                        || dsr < ref.current._arrangerMinimalRawSpace
                }).filter(v => {
                    let ds = this.distanceSquare(v.current, ref.current)
                    return ds < v.current._arrangerMinimalSpace
                        || ds < ref.current._arrangerMinimalSpace
                }).filter(v => {
                    return v != ref && v.current.parent.parent != ref.current
                }).reduce((acc, v) => {
                    let refAbs = ref.current.getAbsolutePosition()
                    let vAbs = v.current.getAbsolutePosition()
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

                this.moveElement(ref.current, avg)
            }

        })
    }

    /**
     * 
     * @param {Object} konvaObject 
     * @param {Object} direction 
     * @param {number} direction.x 
     * @param {number} direction.y 
     */
    moveElement(konvaObject, direction) {

        let length = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2))
        let dir = {
            x: direction.x / length,
            y: direction.y / length
        }

        if (!isNaN(dir.x) && !isNaN(dir.y)) {
            konvaObject.x(konvaObject.x() + dir.x * this.speed)
            konvaObject.y(konvaObject.y() + dir.y * this.speed)
            konvaObject._arrangerUpdate()
        } else {

            konvaObject.x(konvaObject.x() + (Math.random() - 0.5) * this.speed)
            konvaObject.y(konvaObject.y() + (Math.random() - 0.5) * this.speed)
            konvaObject._arrangerUpdate()
        }

        konvaObject.getLayer().draw()
    }

    /**
     * 
     * @param {Object} fromKonvaObject
     * @param {Object} toKonvaObject 
     */
    distanceSquare(fromKonvaObject, toKonvaObject) {
        let abs = toKonvaObject.getAbsolutePosition()
        let near1 = fromKonvaObject._arrangerBoundingType(fromKonvaObject, abs)
        let near2 = toKonvaObject._arrangerBoundingType(toKonvaObject, near1)

        return Math.pow(near1.x - near2.x, 2)
            + Math.pow(near1.y - near2.y, 2)
    }

    /**
     * 
     * @param {Object} fromKonvaObject 
     * @param {Object} toKonvaObject 
     */
    distanceSquareRaw(fromKonvaObject, toKonvaObject) {
        let abs1 = fromKonvaObject.getAbsolutePosition()
        let abs2 = toKonvaObject.getAbsolutePosition()

        return Math.pow(abs1.x - abs2.x, 2)
            + Math.pow(abs1.y - abs2.y, 2)
    }


}
let arranger = new Arranger

let anim = new Konva.Animation(() => {
    arranger.tick()
})

arranger.onStart = () => {
    anim.start()
}

export default arranger