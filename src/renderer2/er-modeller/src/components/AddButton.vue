<template>
  <v-group ref="addButton" @click="e => $emit('click',e)">
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
        fill: "#00cc00"
      },
      text: {
        x: -4,
        y: -7,
        fontSize: 14,
        text: "+",
        fill: "#fff"
      }
    };
  },
  methods: {
    getStage() {
      return this.$refs.addButton.getStage();
    }
  }
};
</script>
