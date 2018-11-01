import Element from './Element'


const toBeInformed = []
class ElementRenderer {
    static render(elem, child = false) {
        if (!(elem instanceof Element)) {
            console.log(elem, 'is not instance of Element')
            return
        }

        if (elem.container) {
            elem.container.add(elem.shape)
        } else {
            elem.layer.add(elem.shape)
        }

        if (elem.shape) {
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
            elem.layer.draw()
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