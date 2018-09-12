import React, { Component } from 'react';
import { Group, Rect, Text } from 'react-konva';

class Entitiy extends Component {

    constructor(props) {
        super(props);
        this.padding = 10
    }
    componentDidMount() {
        const bg = this.refs.bg
        const text = this.refs.textNode

        bg.width(text.width()+ 2* this.padding)
    }
    _handleEditName() {
        const textNode = this.refs.textNode
        // create textarea over canvas with absolute position

        // first we need to find its positon
        var textPosition = textNode.getAbsolutePosition();

        var areaPosition = {
            x: textPosition.x ,
            y: textPosition.y
        };


        // create textarea and style it
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        textarea.value = textNode.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = textNode.width();

        textarea.focus();


        textarea.addEventListener('keydown', function (e) {
            // hide on enter
            if (e.keyCode === 13) {
                textNode.text(textarea.value);
                document.body.removeChild(textarea);
            }
        });
    }

    render() {
        return (
            <Group>
                <Rect
                    ref="bg"
                    width={200}
                    height={40}
                    fill="#fff"
                    cornerRadius={10}
                />
                <Text
                    ref="textNode"
                    text="Some text on canvas"
                    fontSize={15}
                    x={10}
                    y={10}
                    onDblClick={this._handleEditName.bind(this)} />
            </Group>
        );
    }
}

export default Entitiy