
class TemplateSelector {
    static select(data) {
        return new Promise((resolve, reject) => {
            //create view
            TemplateSelector._createView(data)

            TemplateSelector._onAccept(() => {
                let res = TemplateSelector._getSelected()
                TemplateSelector._removeView()
                resolve(res)
            })

            TemplateSelector._onCancel(() => {
                TemplateSelector._removeView()
                reject("cancelled")
            })
        })
    }

    static _getSelected() {
        return Array.from(document.querySelectorAll('.selectOptions input[type="checkbox"]:checked'))
        .map(el => {
            return {
                template: el.dataset.template, 
                pack: el.dataset.pack
            }
        })
        .filter(el => el.template)
    }

    static _getRequirementsView(requirements, packdir) {

        return `<table><tbody>${requirements.map(req => `
        <tr>
            <td>
                <div style="padding-left:1rem;" class="level">
                    <label><input type="checkbox" checked="true" data-pack="${packdir}" ${ req ? "data-template='" + req.template + "'" : "" }> ${req ? req.name : "ERROR: Wrong template!"}</label>
                    ${
            (req && req.children && req.children.length != 0)
                ? TemplateSelector._getRequirementsView(req.children, packdir)
                : ""
            }
                </div>
            </td>
        </tr>
        `).join('')}
        </tbody></table>`
    }

    static _createView(data) {
        document.querySelector('#temp').innerHTML += `
        <div class="selectOptions">
            <table><tbody>
            ${ data.map(option => `
                <tr>
                    <td>${option.entity.name}</td>
                    <td>
                        <table><tbody>
                            ${ option.packs.map(pack => `
                                <tr>
                                    <td>
                                        <div style="padding-left:1rem;" class="level">
                                            <label><input type="checkbox" checked="true"> ${pack.name}</label>
                                            ${ TemplateSelector._getRequirementsView(pack.requirements, pack.dir)}
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody></table>
                    </td>
                </tr>
            `).join('')}
            </tbody></table>
            <div class="footer">
                <button class="cancelSelection">Cancel</button>
                <button class="acceptSelection">Select</button>
            </div>
        </div>
        `
        document.querySelector('#konva').style.filter = 'blur(2px)'
        TemplateSelector._checkboxDependencies()
    }

    static _onAccept(callback) {
        document.querySelector(".acceptSelection").addEventListener('click', callback)
    }

    static _onCancel(callback) {
        document.querySelector(".cancelSelection").addEventListener('click', callback)
    }

    static _removeView() {
        document.querySelector('#konva').style.filter = 'blur(0)'
        var e = document.querySelector('.selectOptions')
        if (e)
            e.remove()
    }

    static _checkboxDependencies() {
        document
            .querySelectorAll('.selectOptions input[type="checkbox"]').forEach(el => {
                el.addEventListener("click", e => {

                    let table = e.target
                        .parentNode
                        .parentNode
                        .querySelector("table")

                    let children
                    if (table)
                        children = table.querySelectorAll("input[type='checkbox']")
                    else
                        children = []

                    // get current checked value
                    let checked = e.target.checked

                    if (!checked) {
                        // if we turned off
                        children.forEach(element => {
                            element.checked = false
                        });
                    } else {
                        // if we turned on
                        TemplateSelector._setParentCheckboxChecked(e.target)
                        //check the state of the children
                        let atLeastOneChecked = false
                        children.forEach(element => {
                            atLeastOneChecked = atLeastOneChecked || element.checked
                        });

                        //change the children 
                        if (!atLeastOneChecked) {
                            children.forEach(element => {
                                element.checked = true
                            });
                        }
                    }
                })
            })
    }

    static _setParentCheckboxChecked(el) {

        let parentCheckbox = TemplateSelector._getParent(el, ".level")

        if (parentCheckbox) {
            TemplateSelector._setParentCheckboxChecked(parentCheckbox)
            parentCheckbox = parentCheckbox.querySelector("input")
            parentCheckbox.checked = true
        }

    }

    static _getParent(elem, selector) {
        elem = elem.parentNode
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) return elem;
        }
        return null;
    }
}

export default TemplateSelector