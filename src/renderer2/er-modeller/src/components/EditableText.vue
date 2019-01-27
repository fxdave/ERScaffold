<template>
    <v-text ref="editableText" :config="textConfig"></v-text>
</template>

<script>
export default {
    props: ['value', 'config'],
    data() {
        return {
            textConfig: {
                ...this.config,
                text: this.value
            }
        }
    },
    methods: {
        onChangeText() {
            this.$emit("input",this.value)
            this.$emit("updated:width",this.value)
        },
        changeText() {

        },
        getStage() {
            return this.$refs.editableText.getStage()
        }
    },
    mounted() {
        this.onChangeText()
    }
}
</script>
