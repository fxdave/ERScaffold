<template>
  <v-group>
    <slot name="from" :from="direction.from" :rel="direction.rel" :to="direction.to"></slot>
    <slot name="to" v-bind="direction"></slot>
    <relation
      :value="value"
      @input="handleRelationMove"
      @delete="$emit('delete')"
    ></relation>
  </v-group>
</template>

<script>
import Relation from "../Relation.vue";

export default {
  components: {
    Relation
  },
  props: ["value"],
  data() {
    return {
      direction: {
        from: { x: 0, y: 0 },
        rel: { x: 0, y: 0 },
        to: { x: 0, y: 0 }
      },
      half: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    handleRelationMove(val) {
      this.half = {
        x : val.x,
        y : val.y
      }
      this.$emit("input", val)
      this.update();
    },
    update() {
      this.updateFrom();
      this.updateTo();
      this.updateRel();
    },
    updateRel() {
      this.direction.rel = { ...this.half };
    },
    updateFrom() {
      this.direction.from = { ...this.value.from.getPosition() };
    },
    updateTo() {
      this.direction.to = { ...this.value.to.getPosition() };
    },
    /**
     * TODO: this method shouldn't be here
     */
    getHalf(from, to) {
      return {
        x: (from.x + to.x) / 2,
        y: (from.y + to.y) / 2
      };
    }
  },
  mounted() {
    this.value.from.$on("input", this.updateFrom);
    this.value.to.$on("input", this.updateTo);

    this.half = this.getHalf(
      this.value.from.getPosition(),
      this.value.to.getPosition()
    );

    this.value.from.$on("input", this.updateFrom)
    this.value.to.$on("input", this.updateTo)

    this.$emit("input", {
      ...this.value,
      x: this.half.x,
      y: this.half.y
    })

    this.update();
  }
};
</script>
