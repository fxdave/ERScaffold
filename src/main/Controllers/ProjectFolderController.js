import Controller from "./Controller";

class ProjectFolderController {
  /**
   *
   * @param {Dialog} dialog
   * @param {ProjectFolderSelector} projectFolderSelector
   */
  constructor(dialog, projectFolderSelector) {
    this.dialog = dialog;
    this.projectFolderSelector = projectFolderSelector;
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

      this.projectFolderSelector.select(selectedDir[0])

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

  isProjectFolderSelected() {
      return {
          selected: this.projectFolderSelector.isSelected()
      }
  }
}

export default ProjectFolderController