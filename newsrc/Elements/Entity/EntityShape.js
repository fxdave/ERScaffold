import Shape from '../../Utils/Element'
import EditableText from '../../../src/Elements/EditableText';
export default new Shape({
    children: {
        text: new EditableText,
        bg: new RectangleShape,
        deleteButton: new DeleteButton,
        propertyAddButton: new AddButton,
        propertyAddLine: new LineShape,
        hasManyConnectorHandle: new HasManyConnectorHandle,
        hasOneConnectorHandle: new HasOneConnectorHandle,
    },
    events: {
        onTextChange: new EventRegister({
            shape: this.children.text,
            eventName: "change"
        }),
        onHasManyConnect: new EventRegister({
            shape: this.children.hasManyConnectorHandle,
            eventName: "connect"
        }),
        onHasOneConnect: new EventRegister({
            shape: this.children.hasOneConnectorHandle,
            eventName: "connect"
        })
    },
    anchors: {
        bgSize : new WidthAnchor(this.children.text, this.children.bg, {
            paddingLeft : 10,
            paddingRight: 10
        }),
        deleteButtonPos: new PositionAnchor(this.children.bg,this.children.deleteButton, {
            top:-5,
            right:-5,
        }),
        propertyAddButtonPos: new PositionAnchor(this.children.bg,this.children.propertyAddButton, {
            left: 0,
            right:0,
            top: -40
        }),
        propertyAddLinePos: new LineAnchor(this.children.propertyAddLine,{
            from: {
                shape: this.children.bg,
                top:0,
                left:0,
                right:0,
                bottom:0
            },
            to: {
                shape: this.children.bg,
                top:0,
                left:0,
                right:0,
                bottom:0
            }
        }),
        hasManyPos: new PositionAnchor(this.children.bg,this.children.hasManyConnectorHandle, {
            rihgt:0,
            bottom:0
        }),
        hasOnePos: new PositionAnchor(this.children.bg,this.children.hasOneConnectorHandle, {
            rihgt:0,
            bottom:0
        })
    }
})