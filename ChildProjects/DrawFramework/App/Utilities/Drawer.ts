class Drawer {
	constructor() {
		// attributes
		this.elements = []
	}

	add(el) {
        this.elements.push(el)
		el.addEventListener('onDeleteElement', this._onDeleteElement.bind(this))
	}

	_onDeleteElement(e) {
		this.elements = this.elements.filter( el => el != e.element )
    }
}

export default Drawer;