import * as Konva from 'konva';
import * as React from 'react';
import { Group, Rect, Text } from 'react-konva';
class Entitiy extends React.Component<any, any> {
    private padding: number = 10

    public x : number
    public y : number

    private bg: React.RefObject<Konva.Rect>;
    private text: React.RefObject<Konva.Text>;
    constructor(props: any) {
        super(props)
        this._handleEditName = this._handleEditName.bind(this)
        this.bg = React.createRef()
        this.text = React.createRef()
    }

    public componentDidMount() {
        this._fitToText()
    }

    public render() {
        return (
            <Group>
                <Rect
                    ref={this.bg}
                    width={200}
                    height={40}
                    fill="#fff"
                    cornerRadius={10}
                />
                <Text
                    ref={this.text}
                    text="Some text on canvas"
                    fontSize={15}
                    x={10}
                    y={10}
                    onDblClick={this._handleEditName} />
            </Group>
        );
    }

    private _handleEditName() {
        const textNode = this.text.current!
        // create textarea over canvas with absolute position

        // first we need to find its positon
        const textPosition = textNode.getAbsolutePosition();

        const areaPosition = {
            x: textPosition.x,
            y: textPosition.y
        };


        // create textarea and style it
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        textarea.value = textNode.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = textNode.width() + 'px';

        textarea.focus();


        textarea.addEventListener('keydown', (e) => {
            // hide on enter
            if (e.keyCode === 13) {
                textNode.text(textarea.value);
                document.body.removeChild(textarea);
                this._fitToText()
            }
        });
    }

    private _fitToText() {
        this.bg.current!.width(this.text.current!.width() + 2 * this.padding)
    }
}

export default Entitiy