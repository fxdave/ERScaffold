<template>
  <v-line
    ref="line"
    :config="myConfig"
    @dragstart="e => $emit('dragstart',e)"
    @dragend="e => $emit('dragend',e)"
    @dragmove="e => $emit('dragmove',e)"
  ></v-line>
</template>

<script>
export default {
  props: ["config", "quadratic"],
  data() {
    return {
      myConfig: null
    };
  },
  methods: {
    getStage() {
      return this.$refs.line.getStage();
    },
    update() {
      this.myConfig = {
        ...this.config,
        sceneFunc: this.quadratic
          ? (ctx, shape) => {
              ctx.beginPath();

              let P = this.config.points;
              ctx.moveTo(P[0], P[1]);
              ctx.bezierCurveTo(P[2],P[3], P[4],P[5], P[4],P[5]);

              //ctx.bezierCurveTo(lessPoints[0], lessPoints[1], ...lessPoints);
              // (!) Konva specific method, it is very important
              ctx.fillStrokeShape(shape);
            }
          : undefined
      };
    }
  },
  watch: {
    config: {
      handler() {
        this.update();
      },
      deep: true
    }
  },
  mounted() {
    this.update(this.config);
  }
};
</script>
