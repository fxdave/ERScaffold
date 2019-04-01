import React from "react";
import { Group, Ellipse, Text, Line } from "react-konva";
import { WidthAnchor, CenterAnchor, PositionAnchor } from "react-konva-anchors";
import Arranger from "../arranger/Arranger";
import BoundingBox from "../arranger/BoundingBox";
import DeleteButton from "./DeleteButton";
import Dialog from "./utils/Dialog";

class Property extends React.Component {
  constructor(props) {
    super(props);
    this.prop = React.createRef();
    this.bg = React.createRef();
    this.nameText = React.createRef();
    this.typeText = React.createRef();
    this.deleteButton = React.createRef();
    this.input = React.createRef();
  }

  componentDidMount() {
    const E = this.prop;
    E.current._arrangerMinimalSpace = 900;
    E.current._arrangerMinimalRawSpace = 15000;

    E.current._arrangerBoundingType = (element, to) => {
      this.bg.current._arrangerElementCentered = true;
      return BoundingBox(this.bg.current, to);
    };

    E.current._arrangerUpdate = () => {
      this.handleMove();
    };
    Arranger.add(E);
  }

  componentWillUnmount() {
    const E = this.prop;
    Arranger.remove(E);
  }

  componentDidUpdate() {
    if (this.state.showDialog) this.input.current.focus();
  }

  handleMove = () => {
    this.setState({
      x: this.prop.current.x(),
      y: this.prop.current.y()
    });
  };

  handleDrop = () => {
    this.props.onChange({
      x: this.prop.current.x(),
      y: this.prop.current.y()
    });
  };

  handleRename = e => {
    e.cancelBubble = true;
    this.setState({ showDialog: true });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.validName) {
      this.setState({ showDialog: false });

      this.props.onChange({
        name: this.state.name,
        type: this.state.type,
        default: this.state.default
      });
    }
  };

  handleKeyUp = e => {
    let val = e.target.value.replace(/ /g, "").split(":");
    const name = val[0];
    val = val[1] ? val[1].split("=") : [];
    const type = val[0] ? val[0] : "string";
    const def = val[1] ? val[1] : "none";

    this.setState({
      name,
      type,
      default: def,
      validName: name && type
    });
  };

  state = {
    updateTickWorkAround: 0,
    bgWidth: 20,
    nameTextPos: { x: 0, y: 0 },
    typeTextPos: { x: 0, y: 0 },
    deleteButtonPos: { x: 0, y: 0 },
    x: this.props.x,
    y: this.props.y,
    name: this.props.name,
    type: this.props.type,
    default: this.props.default,
    showDialog: this.props.name == "",
    validName: false
  };

  types = [
    {
      name: "string",
      attributes: [
        { name: "min", example: "=MI" },
        { name: "max", example: "=MAX" }
      ]
    },
    {
      name: "text",
      attributes: [
        { name: "min", example: "=MI" },
        { name: "max", example: "=MAX" }
      ]
    },
    {
      name: "html",
      attributes: [
        { name: "min", example: "=MI" },
        { name: "max", example: "=MAX" }
      ]
    },
    {
      name: "integer",
      attributes: [
        { name: "step", example: "=STE" },
        { name: "min", example: "=MI" },
        { name: "max", example: "=MA" },
        { name: "unit", example: "=UNIT" }
      ]
    },
    {
      name: "float",
      attributes: [
        { name: "step", example: "=STE" },
        { name: "min", example: "=MI" },
        { name: "max", example: "=MA" },
        { name: "unit", example: "=UNIT" }
      ]
    },
    {
      name: "double",
      attributes: [
        { name: "step", example: "=STE" },
        { name: "min", example: "=MI" },
        { name: "max", example: "=MA" },
        { name: "unit", example: "=UNIT" }
      ]
    },
    {
      name: "money",
      attributes: [
        { name: "step", example: "=STE" },
        { name: "min", example: "=MI" },
        { name: "max", example: "=MAX" }
      ]
    },
    { name: "set", attributes: [{ name: "", example: "val1, val2, ..." }] },
    { name: "enum", attributes: [{ name: "", example: "val1, val2, ..." }] },
    {
      name: "date",
      attributes: [
        { name: "step", example: "=STE" },
        { name: "min", example: "=MI" },
        { name: "max", example: "=MAX" }
      ]
    },
    {
      name: "time",
      attributes: [
        { name: "step", example: "=STE" },
        { name: "min", example: "=MI" },
        { name: "max", example: "=MAX" }
      ]
    },
    {
      name: "datetime",
      attributes: [
        { name: "step", example: "=STE" },
        { name: "min", example: "=MI" },
        { name: "max", example: "=MAX" }
      ]
    }
  ];

  render() {
    return (
      <Group
        ref={this.prop}
        onDblClick={this.handleRename}
        draggable
        onDragMove={this.handleMove}
        onDragEnd={this.handleDrop}
      >
        <Line
          points={[-this.state.x, -this.state.y, 0, 0]}
          stroke="#000"
          strokeWidth={2}
        />

        <Ellipse
          ref={this.bg}
          height={20}
          radius={{
            x: this.state.bgWidth / 2,
            y: 20
          }}
          fill="#ebebeb"
        />

        <Text
          x={this.state.nameTextPos.x}
          y={this.state.nameTextPos.y}
          ref={this.nameText}
          text={this.state.name}
          fontSize={14}
          fill="#000"
          fontFamily="Open Sans"
        />

        <Text
          x={this.state.typeTextPos.x}
          y={this.state.typeTextPos.y}
          ref={this.typeText}
          text={this.state.type.split("[")[0]}
          fontSize={10}
          fill="#000"
          fontFamily="Open Sans"
        />

        <Dialog show={this.state.showDialog}>
          <form onSubmit={this.handleSubmit}>
            <input
              ref={this.input}
              onKeyUp={this.handleKeyUp}
              className={this.state.validName ? "" : "invalid"}
              type="text"
              placeholder="PropertyName : Type = defaultValue"
            />
            <div className="hint">
              <h2> Types: </h2>
              <div>email phone boolean image audio video</div>
              {this.types.map(type => (
                <div>
                  {type.name}
                  <i className="attributes">
                    [
                    {type.attributes.map(attr => (
                      <span>
                        <i className="attribute">{attr.name}</i>
                        {attr.example}
                      </span>
                    ))}
                    ]
                  </i>
                </div>
              ))}
            </div>
          </form>
        </Dialog>

        <Group
          ref={this.deleteButton}
          x={this.state.deleteButtonPos.x}
          y={this.state.deleteButtonPos.y}
          onClick={this.props.onDelete}
        >
          <DeleteButton />
        </Group>

        <PositionAnchor
          element={() => this.deleteButton.current}
          reference={() => this.bg.current}
          referenceOrigin={{ x: 0.5, y: 0.5 }}
          referenceDesiredOrigin={{ x: 1, y: 0.5 }}
          change={(x, y) => this.setState({ deleteButtonPos: { x, y } })}
        />

        <PositionAnchor
          element={() => this.typeText.current}
          elementOrigin={{ x: 0, y: 0 }}
          elementDesiredOrigin={{ x: 0.5, y: -1 }}
          reference={() => this.nameText.current}
          referenceOrigin={{ x: 0, y: 0 }}
          referenceDesiredOrigin={{ x: 0.5, y: 0 }}
          change={(x, y) => this.setState({ typeTextPos: { x, y } })}
        />

        <CenterAnchor
          element={() => this.nameText.current}
          change={(x, y) => this.setState({ nameTextPos: { x, y } })}
        />

        <WidthAnchor
          element={() => this.bg.current}
          reference={() => this.nameText.current}
          padding={20}
          change={width => this.setState({ bgWidth: width })}
        />
      </Group>
    );
  }
}

export default Property;
