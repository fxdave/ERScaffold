<template>
  <v-group>
    <one
      :from="line.from"
      :trough="line.trough"
      :to="line.to"
      :normal="line.normal"
      v-for="(line,key) in lines"
      :key="key"
    ></one>
  </v-group>
</template>

<script>
import One from "./One.vue";
import MathHelper from "../Utils/Math/MathHelper.js";
export default {
  props: ["from", "trough", "to", "normal"],
  components: {
    One
  },
  data() {
    return {
      lines: [
        { from: null, trough: null, to: null, normal: 1 },
        { from: null, trough: null, to: null, normal: 1 },
        { from: null, trough: null, to: null, normal: 1 }
      ]
    };
  },
  watch: {
    from: function(val) {
      this.change(this.from, this.trough, this.to, this.normal);
    },
    trough: function(val) {
      this.change(this.from, this.trough, this.to, this.normal);
    },
    to: function(val) {
      this.change(this.from, this.trough, this.to, this.normal);
    },
    normal: function(val) {
      this.change(this.from, this.trough, this.to, this.normal);
    }
  },
  methods: {
    /**
     *
     * @param {Object} from
     * @param {number} from.x
     * @param {number} from.y
     * @param {Object} to
     * @param {number} to.x
     * @param {number} to.y
     */
    change(from, trough, to, normal = 1) {
      let coords = MathHelper.triangularProjection(trough, from, 7);

      this.lines = [
        { from: { x: coords[0], y: coords[1] }, trough, to, normal },
        { from: { x: coords[2], y: coords[3] }, trough, to, normal },
        { from: { x: coords[4], y: coords[5] }, trough, to, normal }
      ];
    }
  },
  created() {

      this.change(this.from, this.trough, this.to, this.normal);
  }
};
</script>



