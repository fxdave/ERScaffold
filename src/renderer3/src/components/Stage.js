import React from 'react'
import { Stage } from 'react-konva';

class StageComponent extends React.Component {

    state = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    updateViewport = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    subtractDragX = (v) => {
        return v - this.stage.x();
    }

    subtractDragY = (v) => {
        return v - this.stage.y();
    }

    render() {
        return <Stage
            onDblClick={this.props.onDblClick}
            draggable="true"
            width={this.state.width}
            height={this.state.height}
            ref={ref => this.stage = ref}>
            {this.props.children}
        </Stage>
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.updateViewport);

        document.querySelectorAll("canvas").forEach(v => {
            v.onmousedown = () => {
                return false;
            };
        })
    }

}

export default StageComponent