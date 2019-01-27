<template>
  <v-stage ref="stage" :config="configKonva" @dblclick="e => $emit('dblclick',e)">
    <slot></slot>
  </v-stage>
</template>
    
<script>
export default {
  data() {
    return {
      configKonva: {
        draggable: true,
        width: window.innerWidth,
        height: window.innerHeight,
        x:0,
        y:0
      }
    };
  },
  methods: {
    updateViewport() {
      this.configKonva = {
        ...this.configKonva,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    subtractDragX(v) {
      return v - this.$refs.stage.getStage().x();
    },
    subtractDragY(v) {
      return v - this.$refs.stage.getStage().y();
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.updateViewport);

      document.querySelectorAll("canvas").forEach(v => {
        v.onmousedown = () => {
          return false;
        };
      });
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateViewport);
  }
};
</script>
