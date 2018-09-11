import Vector from '../LinearAlgebra/Vector';
import Point from '../LinearAlgebra/Point';

class MouseEventHelper {

    difference : Vector = null

    getMovedCenter(actualPos : Point, center : Point) {
        if (this.difference === null) {
            this.difference = Vector.sub(center, actualPos)
        }
        return Vector.add(actualPos, this.difference)
    }

    resetMovement() {
        this.difference = null
    }


    getRelativePosition(actualPos: Vector, click: Vector): any {
        return Vector.sub(click, actualPos)
    }
}

export default MouseEventHelper