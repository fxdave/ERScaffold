import React, { Component } from "react";
const { ipcRenderer } = eval("require")("electron");
import Viewport from "./components/Viewport";
import TemplateSelector from "./components/TemplateSelector";

import "./assets/css/Global.scss";
import "./assets/css/OpenSans.scss";
import "./assets/css/Panel.scss";

class App extends Component {
  constructor(props) {
    super(props);

    // register the import action that will be fired when the main sends the imported json
    ipcRenderer.on("import", this.handleImportResponse);
    // register the generateSelect action that will be fired when the main sends the templates to choose
    ipcRenderer.on("generateSelect", this.handleGenerateResponse);
    // register the generateSelectFinidhed that will be fired when the main has finished the generation
    ipcRenderer.on("generateSelected", this.handleGenerateSelectFinished);
    // register the openFolder event that will be fired when the main tried to open the directory
    ipcRenderer.on("openFolder", this.handleOpenFolderResponse);

    // ask wether project folder is selected or not
    ipcRenderer.send("isProjectFolderSelected");
    // get the answer
    ipcRenderer.on("isProjectFolderSelected", this.handleProjectFolderSelection);
  }

  state = {
    templatesToSelect: [],
    showControls: true,
    appName: "",
    projectFolderSelected: false
  };

  /**
   * When the user rename the application
   */
  handleAppRename = e => {
    this.setState({
      appName: e.target.value
    });
  };

  handleOpenFolder = () => {
    ipcRenderer.send("openFolder");
  };

  handleOpenFolderResponse = (e, response) => {
    alert(response.msg);

    if (response.success) {
      this.setState({
        projectFolderSelected: true
      });
    }
  };

  handleProjectFolderSelection = (e, response) => {
      this.setState({
        projectFolderSelected: response.selected
      });
  };

  /**
   * When the user clicks on the export button
   */
  handleExport = () => {
    ipcRenderer.send("export", this.getExportData());
  };

  /**
   * When the user clicks on the import button
   */
  handleImport = () => {
    ipcRenderer.send("import");
  };

  handleImportResponse = (e, data) => {
    data = JSON.parse(data);
    this.setState({
      appName: data.appName
    });
    this.setModelData(data);
  };

  /**
   * When the user clicks on the generate button
   * this function sends the model to the main process
   * @see handleGenerateResponse
   */
  handleGenerate = () => {
      let asd = JSON.stringify(this.getExportData())
        console.log("asd");
        
    //ipcRenderer.send("generateSelect", asd);
  };

  /**
   * @see handleGenerate
   * when the user has clicked the generate button the main process receives the model
   * then the main process sends data and calls this function because
   * the constructor of this class has registered this
   */
  handleGenerateResponse = (e, data) => {
    if (data.success) {
      this.setState({
        templatesToSelect: data.msg
      });
    } else {
      alert(`Sorry there is an error: ${data.msg}`);
    }
  };

  handleGenerateSelectFinished = (e, data) => {
    if (data.success) {
      alert("All fine!");
      // so close the selector
      this.setState({
        templatesToSelect: []
      });
    } else {
      alert(`Sorry there is an error: ${data.msg}`);
    }
  };

  /**
   * when the user selects the template we sends the selected templates by this function
   */
  handleTemplateSelect = e => {
    ipcRenderer.send("generateSelected", e);
  };

  getExportData = () => ({
        ...this.getModelData(),
        appName: this.state.appName
    });

  render() {
    return (
      <div id="app">
        <div
          className="help"
          onMouseOver={() => this.setState({ showControls: false })}
          style={{ visibility: this.state.showControls ? "visible" : "hidden" }}
        >
          <h1>Controls:</h1>
          <div className="control">
            <b>Double click</b> to the background in order to create an Entity.
          </div>
          <div className="control">
            <b>Double click</b> to any element to change their properties.
          </div>
          <div className="control">
            <b>Drag</b> the handlers to connect entites.
          </div>
          <div className="control">
            You can <b>Drag</b> the elements and the viewport.
          </div>
        </div>
        <div id="canvas">
          <Viewport
            setModelData={setDataFunction =>
              (this.setModelData = setDataFunction)
            }
            getModelData={getDataFunction =>
              (this.getModelData = getDataFunction)
            }
          />
        </div>
        <div className="panel">
          <section className="app-name">
            <input
              onChange={this.handleAppRename}
              type="text"
              placeholder="ApplicationName in uppercamelcase"
              value={this.state.appName}
            />
          </section>
          <section className="controls">
            <button onClick={this.handleOpenFolder} id="openFolder">
              Open folder
            </button>
            <button
              onClick={this.handleExport}
              id="export"
              disabled={this.state.appName == ""}
            >
              Export
            </button>
            <button onClick={this.handleImport} id="import">
              Import
            </button>
            <button
              onClick={this.handleGenerate}
              id="generate"
              disabled={
                this.state.appName == "" || !this.state.projectFolderSelected
              }
            >
              Generate
            </button>
          </section>
        </div>
        <div id="temp" />
        {this._showTemplateSelector()}
      </div>
    );
  }

  _showTemplateSelector = () => {
    if (this.state.templatesToSelect.length != 0)
      return (
        <TemplateSelector
          data={this.state.templatesToSelect}
          onSelect={this.handleTemplateSelect}
          onCancel={() => this.setState({ templatesToSelect: [] })}
        />
      );
    return null;
  };
}

export default App;
