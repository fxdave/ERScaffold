import React, { Component } from 'react';
import Viewport from './components/Viewport'
import './assets/css/Global.scss'
import './assets/css/OpenSans.scss'
import './assets/css/Panel.scss'

class App extends Component {


  render() {
    return (
      <div id="app">
        <Viewport />
        <div className="panel">
          <section className="tip">
            <span>Tip: Use double click in order to add an entity</span>
          </section>
          <section className="controls">
            <button id="export">Export</button>
            <button id="import">Import</button>
            <button id="generate">Generate</button>
          </section>
        </div>
        <div id="temp"></div>
      </div>
    );
  }
}

export default App;
