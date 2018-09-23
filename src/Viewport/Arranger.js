class Arranger {
    constructor() {
        this.arrangables = []
    }

    add(arrangable) {
        this._setDefaults(arrangable)
        this.arrangables.push(arrangable)
    }

    remove(arrangable) {
        this.arrangables = this.arrangables.filter(v => {
            return v != arrangable
        })
    }

    tick() {
        this.arrangables.forEach(elem => {

            let sumVector = {
                x: 0,
                y: 0
            }
            let relatedCount = 0
            this.arrangables.forEach(env_elem => {
                if (env_elem != elem && elem != env_elem.parent) {

                    // it is needed to be arranged

                    let envAbs = env_elem.getAbsolutePosition()
                    let elemAbs = elem.getAbsolutePosition()
                    let near = elem.getNearestPoint({
                        x: envAbs.x,
                        y: envAbs.y
                    })

                    let nearBack = env_elem.getNearestPoint(near)

                    /*
                    nearBack = elem.getNearestPoint(nearBack)
                    nearBack = env_elem.getNearestPoint(nearBack)
                    */


                    let dist = this._distanceSquare(near, nearBack)
          
                    
                    if (dist < elem.optimalDistanceSquare || dist < env_elem.optimalDistanceSquare) {
                        
                        // UNCOMMENT IT FOR DEBUG
                        //env_elem.opacity(Math.random()*0.5+0.5)

                        let V = {
                            x: elemAbs.x - envAbs.x,
                            y: elemAbs.y - envAbs.y
                        }


                        sumVector.x += V.x
                        sumVector.y += V.y
                        relatedCount++;
                    }
                }
            })

            if (relatedCount != 0) {
                let avgVector = {
                    x: sumVector.x / relatedCount,
                    y: sumVector.y / relatedCount
                }

                let l = Math.sqrt(Math.pow(avgVector.x, 2) + Math.pow(avgVector.y, 2))

                if (l != 0) {
                    elem.x(elem.x() + avgVector.x / l *2)
                    elem.y(elem.y() + avgVector.y / l *2)
                } else {
                    elem.x(elem.x() + Math.random()-0.5)
                    elem.y(elem.y() + Math.random()-0.5)
                }
                elem.dispatchEvent(new Event("arrange"))
            }
        })
    }

    _setDefaults(elem) {
        if (!elem.optimalDistanceSquare) {
            elem.optimalDistanceSquare = 3000
        }
        if (!elem.getNearestPoint) {
            elem.getNearestPoint = to => {
                return {
                    x: elem.getAbsolutePosition().x,
                    y: elem.getAbsolutePosition().y
                }
            }
        }
    }

    _distanceSquare(a, b) {
        return Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)
    }
}

export default Arranger