<template>
  <v-group ref="deleteButton" @click="e => $emit('click',e)">
    <v-circle ref="bg" :config="bg"></v-circle>
    <v-text ref="text" :config="text"></v-text>
  </v-group>
</template>

<script>
export default {
  data() {
    return {
      bg: {
        x: 0,
        y: 0,
        radius: 10,
        fill: "#ff006f"
      },
      text: {
        x: -4,
        y: -4,
        fontSize: 10,
        text: "\u2715",
        fill: "#fff"
      }
    };
  },
  methods: {
    getStage() {
      return this.$refs.deleteButton.getStage()
    }
  }
};
</script>
