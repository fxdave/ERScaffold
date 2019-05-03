import React from 'react'
import { enableRipple } from '@syncfusion/ej2-base'
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations'

enableRipple(true)

class TemplateSelector extends React.Component {
    constructor(props) {
        super(props)
        this.tree = React.createRef()
    }

    preFormatRequirementData(requirements, pack) {
        if (requirements)
            return requirements.map(req => {
                console.log(req)
                
                return {
                    id: req.path,
                    isChecked: true,
                    enabled: req.enabled,
                    name: req.name,
                    child: this.preFormatRequirementData(req.children, pack)
                }})
        return undefined
    }

    preFormatData(data) {
        return data.map(option => ({
            id: `0-entitiy-${option.entity.name}`, // 0- means that it is not a template
            name: option.entity.name,
            expanded: true,
            child: option.packs.map(pack => ({
                isChecked: true,
                id: `0-pack-${option.entity.name.replace(/[^0-9a-zA-Z\-]/g,'')+pack.name.replace(/[^0-9a-zA-Z\-]/g,'')}`, // 0- means that it is not a template
                name: pack.name,
                child: this.preFormatRequirementData(pack.requirementCollection, pack)
            }))
        }))
    }

  fields = {
      dataSource: this.preFormatData(this.props.data),
      id: 'id',
      text: 'name',
      child: 'child'
  };

  handleSelect = () => {
      const selected = this.tree.current
          .getAllCheckedNodes()
          .filter(node => node[0] != '0' && node[1] != '-')

      this.props.onSelect(selected)
  };

  render() {
      return (
          <div className="selectOptions">
              <TreeViewComponent ref={this.tree} fields={this.fields} showCheckBox />
              <div className="footer">
                  <button className="cancelSelection" onClick={this.props.onCancel}>
                    Cancel
                  </button>
                  <button className="acceptSelection" onClick={this.handleSelect}>
                    Select
                  </button>
              </div>
          </div>
      )
  }
}

export default TemplateSelector
