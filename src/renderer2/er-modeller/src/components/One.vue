<template>
  <line-shape ref="one" :quadratic="true" :config="config"></line-shape>
</template>

<script>
import LineShape from "./basic/LineShape.vue";
import Vector from "../Utils/Math/Vector.js";
import MathHelper from "../Utils/Math/MathHelper.js";

export default {
  props: ["from", "trough", "to", "normal"],
  components: {
    LineShape
  },
  data() {
    return {
      config: {
        stroke: "black",
        strokeWidth: 2
      }
    };
  },
  watch: {
    from: function() {
      this.change(this.from, this.trough, this.to, this.normal);
    },
    trough: function() {
      this.change(this.from, this.trough, this.to, this.normal);
    },
    to: function() {
      this.change(this.from, this.trough, this.to, this.normal);
    },
    normal: function() {
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
    change(from, trough, to, normalID = 1) {
      
      from = Vector.fromObject(from);
      to = Vector.fromObject(to);
      trough = Vector.fromObject(trough);
      
/*
      this.config.points = [from.x, from.y, to.x, to.y, trough.x, trough.y];
*/
      let C = MathHelper.getSmoothPoint(from, trough, to);
      if (Vector.getDistanceSquare(from, to) < 300) {
        let from_half_vector = Vector.sub(trough, from);
        let N = Vector.getNormal(from_half_vector, normalID);
        C = Vector.add(from, trough);
        C.divEachBy(2);

        try {
          N.normalize();
          N.mulEachBy(100);

          C.add(N);
        } catch (e) {
          // dont care
        }
      }
      this.config = {
        ...this.config,
        points:  [trough.x, trough.y, C.x, C.y, from.x, from.y]
      }
    }
  },
  created() {

      this.change(this.from, this.trough, this.to, this.normal);
  }
};
</script>
