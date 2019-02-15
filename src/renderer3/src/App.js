import React, { Component } from 'react';
import Viewport from './components/Viewport'
import './assets/css/Global.scss'
import './assets/css/OpenSans.scss'
import './assets/css/Panel.scss'

class App extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    showControls: true,
    appName: ""
  }

  handleAppRename = e => {
    this.setState({
      appName: e.target.value
    })
  }

  render() {
    return (
      <div id="app">
        <div className="help"  onMouseOver={() => this.setState({showControls:false})} style={{ visibility: this.state.showControls ? 'visible' : 'hidden' }}>
          <h1>Controls:</h1>
          <div className="control"><b>Double click</b> to the background in order to create an Entity.</div>
          <div className="control"><b>Double click</b> to any element to change their properties.</div>
          <div className="control"><b>Drag</b> the handlers to connect entites.</div>
          <div className="control">You can <b>Drag</b> the elements and the viewport.</div>
        </div>
        <div id="canvas">
          <Viewport />
        </div>
        <div className="panel">
          <section className="app-name">
            <input onKeyUp={this.handleAppRename} type="text" placeholder="ApplicationName in uppercamelcase" />
          </section>
          <section className="controls">
            <button id="export" disabled={this.state.appName == ""}>Export</button>
            <button id="import">Import</button>
            <button id="generate" disabled={this.state.appName == ""}>Generate</button>
          </section>
        </div>
        <div id="temp"></div>
      </div>
    );
  }
}

export default App;
