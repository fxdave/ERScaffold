export default {
    mounted: function () {
        var styles = this.$options.styles
        if (styles) {
            for (let i in styles) {
                if (this.$refs[i])
                    styles[i].apply(this.$refs[i].getStage());
                else
                    console.error("Styles: reference not found: ", i)
            }
        }
    }
}