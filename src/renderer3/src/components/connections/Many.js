import React from 'react'
import One from './One'
import {Group} from 'react-konva'

class Many extends React.Component {
    render() {
        let from = this.props.from
        let trough = this.props.trough
        let to = this.props.to
        let normal = this.props.normal
        let coords = MathHelper.triangularProjection(trough, from, 7);

        let lines = [
            { from: { x: coords[0], y: coords[1] }, trough, to, normal },
            { from: { x: coords[2], y: coords[3] }, trough, to, normal },
            { from: { x: coords[4], y: coords[5] }, trough, to, normal }
        ];

        return <Group>
            { lines.map(line => <One from={line.from} trough={line.trough} to={line.to} normal={normal} />)}
        </Group>
    }
}

export default Many