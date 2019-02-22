import React from 'react';
import { Line } from 'react-konva';

class ConnectorHandle extends React.Component {
  constructor(props) {
    super(props);
    this.handle = React.createRef();
  }

  state = {
    from: { x: 0, y: 0 },
    to: { x: 20, y: 0 }
  };

  render() {
    return (
      <Line
        {...this.props}
        draggable
        ref={this.handle}
        points={this.points(this.state.from, this.state.to)}
        {...this.styles()}
        onDragStart={this.handleDragStart}
        onDragMove={this.handleDragMove}
        onDragEnd={this.handleDragEnd}
        dragBoundFunc={() => ({
          x: this.handle.current.getAbsolutePosition().x,
          y: this.handle.current.getAbsolutePosition().y
        })}
      />
    );
  }

  moveToTempLayer = () => {
    // store the current position for later use
    this.oldPos = {
      x: this.handle.current.x(),
      y: this.handle.current.y()
    };

    // set the new position
    const stage = this.handle.current.getStage();
    const pos = this.handle.current.getAbsolutePosition();
    this.handle.current.x(pos.x - stage.x());
    this.handle.current.y(pos.y - stage.y());

    this.previousLayer = this.handle.current.parent;
    const tempLayer = stage.find('.tempLayer');
    this.handle.current.moveTo(tempLayer);
    this.handle.current.getLayer().draw();
  };

  setRotation = r => {
    this.previousRotation = this.handle.current.rotation();
    this.handle.current.rotation(r);
  };

  setPreviousRotation = () => {
    this.handle.current.rotation(this.previousRotation);
  };

  handleDragStart = e => {
    this.moveToTempLayer();
    this.setRotation(0);
  };

  handleDragMove = e => {
    const a = this.handle.current.getAbsolutePosition();
    this.setState({
      to: {
        x: e.evt.clientX - a.x,
        y: e.evt.clientY - a.y
      }
    });
  };

  moveToPreviousLayer = () => {
    const tempLayer = this.handle.current.getLayer();
    this.handle.current.moveTo(this.previousLayer);
    this.handle.current.x(this.oldPos.x);
    this.handle.current.y(this.oldPos.y);
    this.handle.current.getLayer().draw();
    tempLayer.draw();
  };

  connectionType = 'general';

  handleDragEnd = () => {
    this.moveToPreviousLayer();
    this.setPreviousRotation();
    this.setState({
      to: {
        x: 20,
        y: 0
      }
    });

    this.handle.current.getLayer().draw();
    const stage = this.handle.current.getStage();
    const pos = stage.getPointerPosition();
    let shape = this.handle.current.getLayer().getIntersection(pos);

    if (shape) {
      console.log(shape);

      while (!shape.attrs.name && shape.attrs.name != 'entity')
        shape = shape.parent;
      this.props.onConnect({
        type: this.connectionType,
        to: shape.attrs.entityInstance
      });
    }
  };
}

export default ConnectorHandle;
