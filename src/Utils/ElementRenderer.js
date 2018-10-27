import Element from './Element'


const toBeInformed = []
class ElementRenderer {
    static render(elem, child = false) {
        if (!(elem instanceof Element)) {
            console.log(elem, "is not instance of Element")
            return
        }

        if (elem.container) {
            elem.container.add(elem.shape)
        } else {
            elem.layer.add(elem.shape)
        }

        if (elem.style) {
            elem.addEventListener("mounted", () => {
                elem.style.apply(elem)
                if(elem.mounted)
                    elem.mounted()
            })
        }

        toBeInformed.push(elem)

        if (!child) {
            elem.layer.draw()
            ElementRenderer.inform()
        }



        return elem
    }

    static inform() {
        let current;
        while (current = toBeInformed.pop()) {
            current.dispatchEvent(new Event("mounted"))
        }
    }
}

export default ElementRenderer