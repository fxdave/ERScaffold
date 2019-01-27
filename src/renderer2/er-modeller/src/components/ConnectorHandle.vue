<template>
  <line-shape
    ref="handle"
    :config="handleConfig"
    @dragstart="onDrag"
    @dragmove="onMove"
    @dragend="onDrop"
    :quadratic="quadratic"
  ></line-shape>
</template>

<script>
import LineShape from "./basic/LineShape.vue";

export default {
  props: ["points", "lineStyle"],
  components: {
    LineShape
  },
  data() {
    return {
      quadratic: false,
      previousRotation: 0,
      handleConfig: {
        points: [0, 0, 20, 30, 20, -30],
        ...this.lineStyle,
        draggable: true,
        dragBoundFunc: () => {
          return {
            x: this.$refs.handle.getStage().getAbsolutePosition().x,
            y: this.$refs.handle.getStage().getAbsolutePosition().y
          };
        }
      }
    };
  },
  methods: {
    direct(from, to) {
      this.handleConfig.points = this.points(from, to);
    },
    getStage() {
      return this.$refs.handle.getStage();
    },
    onDrag() {
      this.moveToTempLayer();
      this.setRotation(0);
    },

    onMove(e) {
      e.cancelBubble = true;

      this.direct(
        {
          x: 0,
          y: 0
        },
        {
          x:
            e.evt.clientX -
            this.$refs.handle.getStage().getAbsolutePosition().x,
          y:
            e.evt.clientY - this.$refs.handle.getStage().getAbsolutePosition().y
        }
      );
    },

    onDrop() {
      this.moveToPreviousLayer();
      this.direct({ x: 0, y: 0 }, { x: 20, y: 0 });
      this.setPreviousRotation();
      var pos = this.$refs.handle
        .getStage()
        .getStage()
        .getPointerPosition();
      this.$refs.handle.getStage().getLayer().draw()
      var shape = this.getStage()
        .getLayer()
        .getIntersection(pos);

      console.log(shape);
      
      if (shape) {
        let to = shape.VueComponent.$parent;

        while (to && to.$options && to.$options._componentTag != "entity") {

          console.log(to);
          to = to.$parent;
        }
        this.$emit("connect", to);
      }
    },

    setRotation(r) {
      this.previousRotation = this.$refs.handle.getStage().rotation();
      this.$refs.handle.getStage().rotation(r);
    },

    setPreviousRotation() {
      this.$refs.handle.getStage().rotation(this.previousRotation);
    }
  },
  mounted() {
    this.direct({ x: 0, y: 0 }, { x: 20, y: 0 });
  }
};
</script>
