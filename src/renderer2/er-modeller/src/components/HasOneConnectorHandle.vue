<template>
  <connector-handle :lineStyle="style" :points="points" ref="connectorHandle" @connect="e => $emit('connect',e)"></connector-handle>
</template>

<script>
import ConnectorHandle from "./ConnectorHandle.vue";

export default {
  components: {
    ConnectorHandle
  },
  data() {
    return {
      points(from, to) {
        return [from.x, from.y, to.x, to.y];
      },
      style: {
        stroke: '#ff006f',
        strokeWidth: 4,
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
