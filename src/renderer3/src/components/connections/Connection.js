import React from 'react'
import { Group } from 'react-konva'

class Connection extends React.Component {
    fromComponent = () => { }
    toComponent = () => { }

    render() {
        return <Group>
            {this.fromComponent((Comp) => <Comp normal={1} from={this.getFromPos()} trough={this.getRelPos()} to={this.getToPos()} />)}
            {this.toComponent((Comp) => <Comp normal={-1} from={this.getToPos()} trough={this.getRelPos()} to={this.getFromPos()} />)}
        </Group>
    }

    getFromPos = () => {
        return {
            x: this.props.from.props.x,
            y: this.props.from.props.y
        }
    }

    getRelPos = () => {
        return {
            x: this.props.x,
            y: this.props.y
        }
    }

    getToPos = () => {
        return {
            x: this.props.to.props.x,
            y: this.props.to.props.y
        }
    }
}

export default Connection