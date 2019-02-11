import React from 'react'
import { Group } from 'react-konva'
import Relation from './Relation';

class Connection extends React.Component {
    fromComponent = () => { }
    toComponent = () => { }

    render() {
        return <Group>
            {this.fromComponent((Comp) => <Comp normal={1} from={this.getFromPos()} trough={this.getRelPos()} to={this.getToPos()} />)}
            {this.toComponent((Comp) => <Comp normal={-1} from={this.getToPos()} trough={this.getRelPos()} to={this.getFromPos()} />)}
            <Relation x={this.props.x} y={this.props.y} onChange={this.props.onChange} onDelete={this.props.onDelete}/>
        </Group>
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.fromProps.x != this.props.fromProps.x 
        || nextProps.fromProps.y != this.props.fromProps.y
        || nextProps.toProps.x != this.props.toProps.x 
        || nextProps.toProps.y != this.props.toProps.y
        || nextProps.x != this.props.x
        || nextProps.y != this.props.y

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