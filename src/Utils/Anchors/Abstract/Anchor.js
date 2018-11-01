class Anchor {
    constructor(updateable) {
        this.updateable = updateable
    }

    async update() {
        this.updateable.shape.dispatchEvent(new Event('updated:anchor'))
    }
}
export default Anchor