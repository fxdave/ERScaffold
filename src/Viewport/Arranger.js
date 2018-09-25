class Arranger {
    constructor() {
        this.arrangables = []
        this.animationSpeed = 2
    }

    /**
     * adds an object to the arrangables
     * @param {Object} arrangable
     */
    add(arrangable) {
        this._setDefaults(arrangable)
        this.arrangables.push(arrangable)
    }

    /**
     * removes an object from the arrangables
     * @param {Object} arrangable
     */
    remove(arrangable) {
        this.arrangables = this.arrangables.filter(v => {
            return v != arrangable
        })
    }

    /**
     * arranges all elements that is needed to be arranged
     */    
    tick() {
        this.arrangables.forEach(elem => {

            let sumVector = {
                x: 0,
                y: 0
            }
            let relatedCount = 0
            this.arrangables.forEach(env_elem => {
                if (env_elem != elem && elem != env_elem.parent) {

                    /*
                     * Getting distance
                     */
                    
                    let envAbs = env_elem.getAbsolutePosition()
                    let elemAbs = elem.getAbsolutePosition()
                    let near = elem.getNearestPoint({
                        x: envAbs.x,
                        y: envAbs.y
                    })

                    let nearBack = env_elem.getNearestPoint(near)

                    let dist = this._distanceSquare(near, nearBack)
          
                    /*
                     * Checking distance
                     */
                    
                    if (dist < elem.optimalDistanceSquare || dist < env_elem.optimalDistanceSquare) {
                        // Vector from env to elem
                        let V = {
                            x: elemAbs.x - envAbs.x,
                            y: elemAbs.y - envAbs.y
                        }
                        
                        // Add to sum
                        sumVector.x += V.x
                        sumVector.y += V.y
                        relatedCount++;
                    }
                }
            })

            if (relatedCount != 0) {
                
                // calculate avarage
                let avgVector = {
                    x: sumVector.x / relatedCount,
                    y: sumVector.y / relatedCount
                }

                let l = this._length(avgVector)

                if (l != 0) {
                    elem.x(elem.x() + avgVector.x / l * this.animationSpeed)
                    elem.y(elem.y() + avgVector.y / l * this.animationSpeed)
                } else {
                    //when 
                    elem.x(elem.x() + (Math.random()-0.5) * this.animationSpeed)
                    elem.y(elem.y() + (Math.random()-0.5) * this.animationSpeed)
                }
                elem.dispatchEvent(new Event("arrange"))
            }
        })
    }

    /**
     * Arrangables should have optimalDistanceSquare property , and getNearestPoint method.
     * This method adds these params to the object if they aren't exsisted
     * @param {Object} elem
     */
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
    
    /**
     * Simple distance^2 calculation between two points
     * @param {Object} a {x: number, y: number}
     * @param {Object} b {x: number, y: number}
     * @returns {number}
     */
    _distanceSquare(a, b) {
        return return this._lengthSquare({
            x: b.x - a.x,
            y: b.y - a.y
        })
    }
    
    /**
     * Simple length^2 calculation 
     * @param {Object} a {x: number, y: number}
     * @returns {number}
     */
    _lengthSquare(a) {
        return Math.pow(a.x, 2) + Math.pow(a.y, 2)
    }
    
    /**
     * @param {Object} a {x: number, y: number}
     * @returns {number}
     */
    _length(a) {
        return Math.sqrt(this._lengthSquare(a))
    }
    
    /**
     * TODO: make separate Vector class 
     * @param {Object} a {x: number, y: number}
     * @returns {Object} the normalized Vector {x: number, y: number}
     */
    _normalized(a) {
        let l = this._length(a)
        if(l == 0)
        return {
            x: a.x / l ,
            y: a.y / l
        }
    }
}

export default Arranger
