import React from 'react'
import { Shape } from 'react-konva'
class SmoothLine extends React.Component {

    render() {
        return <Shape
            ref={(this.props.innerRef) ? this.props.innerRef : undefined}
            {...this.props}
            sceneFunc={(ctx, shape) => {
                ctx.beginPath();

                let P = this.props.points;
                ctx.moveTo(P[0], P[1]);
                ctx.bezierCurveTo(P[2], P[3], P[4], P[5], P[4], P[5]);

                //ctx.bezierCurveTo(lessPoints[0], lessPoints[1], ...lessPoints);
                // (!) Konva specific method, it is very important
                ctx.fillStrokeShape(shape);
            }}
        />
    }
}

return React.forwardRef((props, ref) => <SmoothLine {...props} innerRef={ref} />)