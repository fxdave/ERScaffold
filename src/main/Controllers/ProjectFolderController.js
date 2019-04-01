import Controller from "./Controller";

class ProjectFolderController {
  /**
   *
   * @param {Dialog} dialog
   * @param {Object} basedirContainer
   * @param {string} basedirContainer.dir
   */
  constructor(dialog, basedirContainer) {
    this.dialog = dialog;
    this.basedirContainer = basedirContainer;
  }

  /**
   * Choses a project dir
   */
  changeProjectFolder() {
    try {
      const selectedDir = this.dialog.showOpenDialog({
        title: "Please select your project directory",
        buttonLabel: "Select",
        message:
          "Yout project must be ready for use, this tool will extend it.",
        properties: ["openDirectory"]
      });

      this.basedirContainer.dir = selectedDir[0];

      return {
          success: true,
          msg: 'The project folder is successfully opened'
      }
    } catch (err) {
        return {
            success: false,
            msg: 'Sorry couldn\'t open the project folder, reason: ' + err.stack 
        }
    }
  }
}

export default ProjectFolderController