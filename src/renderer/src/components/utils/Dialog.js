import React from 'react'
import Portal from './Portal'
import { Group } from 'react-konva'


class Dialog extends React.Component {

    componentDidMount() {
        this.handleBlur()
    }
    componentDidUpdate() {
        this.handleBlur()
    }

    handleBlur = () => {
        if (this.props.show)
            document.querySelector("#canvas").style.filter = 'blur(2px)'
        else
            document.querySelector("#canvas").style.filter = "blur(0)"
    }

    render() {
        return <Group>
            <Portal>
                <div className="ask" style={{ visibility: this.props.show ? "visible" : "hidden" }}>
                    {this.props.children}
                </div>
            </Portal>
        </Group>
    }
}

export default Dialog