import Element from './Element'
import Arranger from './Arranger/Arranger'

const toBeInformed = []
let lastID = 0
let autoGeneratedElementID = 0
class ElementRenderer {
    static render(elem, child = false, container = undefined) {
        if (!(elem instanceof Element)) {
            console.log(elem, 'is not instance of Element')
            return
        }

        if(elem.model) {
            elem.model._id = lastID
            elem.model._parent= elem
            lastID += 1
        }

        if(container) {
            elem.container = container
        }

        
        if (elem.container) {
            elem.container.add(elem.shape)
            if(elem.container.shape && elem.container.shape.props && elem.container.shape.props.children) {
                elem.container.shape.props.children['autogenerated_'+ autoGeneratedElementID] = elem
                autoGeneratedElementID++
            }
        } else {
            elem.layer.add(elem.shape)
        }

        if (elem.shape) {
            if(elem.shape._arranger_enabled){
                Arranger.add(elem)
            }

            elem.shape.element = elem
            elem.addEventListener('mounted', () => {
                if (elem.style)
                    elem.style.apply(elem)
                if (elem.mounted)
                    elem.mounted()
            })
        }

        if (elem.shape && elem.shape.props && elem.shape.props.events) {
            let events = elem.shape.props.events
            for (let i in events) {
                let functionName = i
                if (events[i].callbackName)
                    functionName = events[i].callbackName
                if (elem[functionName]) {
                    elem[functionName] = elem[functionName].bind(elem)
                    events[i].callback = elem[functionName]
                }
            }
        }

        elem.shape.addEventListener('updated:anchor', () => {
            elem.redraw()
        })

        toBeInformed.push(elem)

        if (!child) {
            elem.redraw()
            ElementRenderer.inform()
        }

        return elem
    }

    static inform() {
        let current
        while (current = toBeInformed.pop()) {
            current.dispatchEvent(new Event('mounted'))
        }
    }
}

export default ElementRenderer