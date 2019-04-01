import React from 'react'
import { Shape } from 'react-konva'

class SmoothLine extends React.Component {
    render() {
        return (
            <Shape
                {...this.props}
                sceneFunc={
                    /**
                     * @param {CanvasRenderingContext2D} ctx
                     * @param {Konva.Node} shape
                     */
                    (ctx, shape) => {
                    ctx.beginPath()

                    const P = this.props.points
                    ctx.moveTo(P[0], P[1])
                    
                    ctx.bezierCurveTo(P[2], P[3], P[4], P[5], P[4], P[5])
                    
                    // (!) Konva specific method, it is very important
                    ctx.fillStrokeShape(shape)
                }}
            />
        )
    }
}

export default SmoothLine
