import Vector from '../Utils/Math/Vector'

class Arranger {
    constructor() {
        this.arrangables = []
        this.animationSpeed = 1.5
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

            // init of sumVector for avarage calculation
            let sumVector = new Vector(0,0)
            // counter of how many elements are related with the actual elem
            let relatedCount = 0
            // the absolute position of the actual elem
            let elemAbs = Vector.fromObject(elem.getAbsolutePosition())

            this.arrangables.forEach(env_elem => {
                if (env_elem != elem && elem != env_elem.parent) {

                    /*
                     * Getting distance
                     */
                    
                    // the absolute position of the environment element
                    let envAbs = Vector.fromObject(env_elem.getAbsolutePosition())

                    // one iteration for getting the nearest point for each other
                    let near = elem.getNearestPoint(envAbs)
                    let nearBack = env_elem.getNearestPoint(near)

                    // convert to vector
                    let nearPoint = Vector.fromObject(near)
                    let nearBackPoint = Vector.fromObject(nearBack)

                    // calculate the distanceSquare
                    let distSquare = Vector.getDistanceSquare(nearPoint,nearBackPoint)
          
                    /*
                     * Checking distance
                     */
                    
                    if (distSquare < elem.optimalDistanceSquare || distSquare < env_elem.optimalDistanceSquare) {
                        // Vector pointing from env to elem
                        let V = Vector.sub(elemAbs,envAbs)

                        //add to sum
                        sumVector.add(V)
                        
                        relatedCount++;
                    }
                }
            })

            if (relatedCount != 0) {
                
                // calculate avarage
                let avgVector = sumVector.divEachBy(relatedCount)
                try {
                    avgVector.normalize()
                    elem.x(elem.x() + avgVector.x * this.animationSpeed)
                    elem.y(elem.y() + avgVector.y * this.animationSpeed)
                } catch(e) {
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
                return elem.getAbsolutePosition()
            }
        }
    }

}

export default Arranger
