import React from 'react'
import {enableRipple} from '@syncfusion/ej2-base';
enableRipple(true);
import {TreeViewComponent} from '@syncfusion/ej2-react-navigations';

class TemplateSelector extends React.Component {

    state = {
        selectedTemplates: [] // Array of { template: el.dataset.template,  pack: el.dataset.pack }
    }

    handleCheck = (checked, req) => {
        if (checked) {
            this.setState({
                selectedTemplates: [...this.state.selectedTemplates, req]
            })
        } else {
            this.setState({
                selectedTemplates: this.state.selectedTemplates.filter(x => x.template != req.template && x.pack != req.pack)
            })
        }
    }

    handleCancel = () => {
        this.props.onCancel()
    }

    handleSelect = () => {
        this.props.onSelect(this.state.selectedTemplates)
    }

    _getRequirementsView(requirements, packdir) {

        if (requirements && requirements.length != 0)
            return <table>
                <tbody>
                    {requirements.map(req => {
                        let templateName = req ? req.name : "ERROR: Wrong template!"
                        let templateChildren = req ? this._getRequirementsView(req.children, packdir) : ''
                        let templateObj = { template: req && req.template ? req.template : '', pack: packdir }
                        return <tr>
                            <td>
                                <div style={{ paddingLeft: '1rem' }} className="level">
                                    <label>
                                        <input onChange={(e) => this.handleCheck(e.target.checked, templateObj)} type="checkbox" />
                                        {templateName}
                                    </label>
                                    {templateChildren}
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        return ""
    }

    render() {
        return <div className="selectOptions">
            <table><tbody>
                {this.props.data.map(option => <tr>
                    <td>{option.entity.name}</td>
                    <td>
                        <table>
                            <tbody>
                                {option.packs.map(pack => <tr>
                                    <td>
                                        <div style={{ paddingLeft: '1rem' }} className="level">
                                            <label><input type="checkbox" checked={true} onChange={() => { }} /> {pack.name} </label>
                                            {this._getRequirementsView(pack.requirements, pack.dir)}
                                        </div>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </td>
                </tr>
                )}
            </tbody></table>
            <div className="footer">
                <button className="cancelSelection" onClick={this.handleCancel}>Cancel</button>
                <button className="acceptSelection" onClick={this.handleSelect}>Select</button>
            </div>
        </div>
    }
}

export default TemplateSelector