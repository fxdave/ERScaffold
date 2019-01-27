class Anchor {
    constructor(updateable) {
        this.updateable = updateable
    }

    async update() {
        this.updateable.$emit('updated:anchor')
    }
}
export default Anchor