import React from 'react'
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';

class TemplateSelector extends React.Component {

    constructor(props) {
        super(props)
        this.tree = React.createRef()
    }

    preFormatRequirementData(requirements, pack) {
        if (requirements)
            return requirements.map(req => ({
                id: pack.dir + "\uffff" + req.template,
                isChecked: true,
                name: req.name,
                child: this.preFormatRequirementData(req.children, pack)
            }))
        return undefined
    }

    preFormatData(data) {
        return data.map(option => ({
            id: "0-entitiy-" + option.entity.name, // 0- means that it is not a template
            name: option.entity.name,
            expanded: true,
            child: option.packs.map(pack => ({
                isChecked: true,
                id: "0-pack-" + pack.dir, // 0- means that it is not a template
                name: pack.name,
                child: this.preFormatRequirementData(pack.requirements, pack)
            }))

        }))
    }

    fields = { dataSource: this.preFormatData(this.props.data), id: 'id', text: 'name', child: 'child' }

    handleSelect = () => {

        let selected = this.tree.current
            .getAllCheckedNodes()
            .filter(node => node[0] != '0' && node[1] != '-')
            .map(node => {
                let expl = node.split(/\uffff/)
                return { pack: expl[0], template: expl[1] }
            })

        this.props.onSelect(selected);

    }

    render() {
        return <div className="selectOptions">
            <TreeViewComponent ref={this.tree} fields={this.fields} showCheckBox={true} />
            <div className="footer">
                <button className="cancelSelection" onClick={this.props.onCancel}>Cancel</button>
                <button className="acceptSelection" onClick={this.handleSelect}>Select</button>
            </div>
        </div>
    }
}

export default TemplateSelector