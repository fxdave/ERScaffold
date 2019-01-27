export default {
    data() {
        return {
            previousLayer: null,
            oldPos: null
        }
    },
    methods: {
        getThisLayer() {
            return this.getStage().getLayer()
        },
        moveToTempLayer() {
            // store the current position for later use
            this.oldPos = {
                x: this.getStage().x(),
                y: this.getStage().y()
            }

            // set the new position
            let stage = this.getStage().getStage()
            let pos = this.getStage().getAbsolutePosition()
            this.getStage().x(pos.x - stage.x())
            this.getStage().y(pos.y - stage.y())

            this.previousLayer = this.getStage().parent
            let tempLayer = this.$store.getters.getLayer("tempLayer")
            this.getStage().moveTo(tempLayer)
            this.getThisLayer().draw()
        },
        moveToPreviousLayer() {

            let tempLayer = this.getThisLayer()
            this.getStage().moveTo(this.previousLayer)
            this.getStage().x(this.oldPos.x)
            this.getStage().y(this.oldPos.y)
            this.getThisLayer().draw()
            tempLayer.draw()

        }
    }
}