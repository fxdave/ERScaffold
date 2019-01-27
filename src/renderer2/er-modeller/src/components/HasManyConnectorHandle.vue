<template>
  <connector-handle :lineStyle="style" :points="points" ref="connectorHandle" @connect="e => $emit('connect',e)"></connector-handle>
</template>

<script>
import ConnectorHandle from "./ConnectorHandle.vue";
import MathHelper from "../Utils/Math/MathHelper.js";

export default {
  components: {
    ConnectorHandle
  },
  data() {
    return {
      points(from, to) {
        let proj = MathHelper.triangularProjection(from, to, 5);
        let proj2 = MathHelper.triangularProjection(to, from, 1);
        return [
          proj2[0],
          proj2[1],
          proj2[4],
          proj2[5],
          proj[0],
          proj[1],
          proj[4],
          proj[5]
        ];
      },
      style: {
        fill: "#ff006f",
        closed: true,
      }
    };
  },
  methods: {
    getStage() {
      return this.$refs.connectorHandle.getStage();
    }
  }
};
</script>
