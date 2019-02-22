import React from 'react';
import { RegularPolygon, Group, Text } from 'react-konva';
import { PositionAnchor, CenterAnchor, WidthAnchor } from 'react-konva-anchors';
import DeleteButton from '../DeleteButton';
import Arranger from '../../arranger/Arranger';
import BoundingBox from '../../arranger/BoundingBox';
import Dialog from '../utils/Dialog';

class Relation extends React.Component {
  constructor(props) {
    super(props);
    this.relation = React.createRef();
    this.bg = React.createRef();
    this.deleteButton = React.createRef();
    this.name = React.createRef();
    this.input = React.createRef();
  }

  state = {
    bgWidth: 0,
    deleteButtonPos: { x: 0, y: 0 },
    namePos: { x: 0, y: 0 },
    showDialog: false,
    name: this.props.name
  };

  componentDidMount() {
    const E = this.relation;
    E.current._arrangerUpdate = () => {
      this.handleMove();
    };
    E.current._arrangerElementCentered = true;
    E.current._arrangerBoundingType = (element, to) => {
      this.bg.current._arrangerElementCentered = true;
      return BoundingBox(this.bg.current, to);
    };
    Arranger.add(E);
  }

  componentWillUnmount() {
    const E = this.relation;
    Arranger.remove(E);
  }

  componentDidUpdate() {
    if (this.state.showDialog) this.input.current.focus();
  }

  handleMove = () => {
    this.props.onChange({
      x: this.relation.current.x(),
      y: this.relation.current.y()
    });
  };

  handleRename = e => {
    e.cancelBubble = true;
    this.setState({ showDialog: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ showDialog: false });

    this.props.onChange({
      name: this.state.name
    });
  };

  handleKeyUp = e => {
    const val = e.target.value.replace(/ /g, '');
    this.setState({
      name: val
    });
  };

  render() {
    return (
      <Group
        onDblClick={this.handleRename}
        ref={this.relation}
        {...this.props}
        draggable
        onDragMove={this.handleMove}
      >
        <RegularPolygon
          ref={this.bg}
          sides={4}
          radius={this.state.bgWidth / 2 - 1} // stroke increases the size
          stroke="black"
          strokeWidth={1}
          fill="#fff"
        />

        <Text
          x={this.state.namePos.x}
          y={this.state.namePos.y}
          ref={this.name}
          text={this.state.name}
          fontSize={14}
          fill="#000"
          fontFamily="Open Sans"
        />

        <Group
          onClick={this.props.onDelete}
          ref={this.deleteButton}
          x={this.state.deleteButtonPos.x}
          y={this.state.deleteButtonPos.y}
        >
          <DeleteButton />
        </Group>

        <Dialog show={this.state.showDialog}>
          <form onSubmit={this.handleSubmit}>
            <input
              ref={this.input}
              onKeyUp={this.handleKeyUp}
              type="text"
              placeholder="PropertyName : Type = defaultValue"
            />
          </form>
        </Dialog>

        <CenterAnchor
          element={() => this.name.current}
          change={(x, y) => this.setState({ namePos: { x, y } })}
        />

        <WidthAnchor
          element={() => this.bg.current}
          reference={() => this.name.current}
          padding={20}
          change={bgWidth => {
            console.log(this.bg.current.getClientRect().width);
            this.setState({ bgWidth });
          }}
        />

        <PositionAnchor
          element={() => this.deleteButton.current}
          elementOrigin={{ x: 0.5, y: 0.5 }}
          elementDesiredOrigin={{ x: 0.5, y: 0.5 }}
          reference={() => this.bg.current}
          referenceOrigin={{ x: 0.5, y: 0.5 }}
          referenceDesiredOrigin={{ x: 1, y: 0.5 }}
          change={(x, y) => this.setState({ deleteButtonPos: { x, y } })}
        />
      </Group>
    );
  }
}

export default Relation;
