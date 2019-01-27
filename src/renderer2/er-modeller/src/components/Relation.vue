<template>
  <v-group ref="relation" :config="relationConfig" @dragmove="handleMove">
    <v-regular-polygon ref="rombus" :config="rombus"></v-regular-polygon>
    <delete-button ref="deleteButton" @click="$emit('delete')"></delete-button>
  </v-group>
</template>

<script>
import DeleteButton from "./DeleteButton.vue";
import PositionAnchor from "../Utils/Anchors/PositionAnchor.js";
export default {
  components: {
    DeleteButton
  },
  props: ["value"],
  data() {
    return {
      relationConfig: {
        draggable: true,
        x: this.value.x,
        y: this.value.y
      },
      rombus: {
        sides: 4,
        radius: 10,
        stroke: "black",
        strokeWidth: 1,
        fill: "#fff"
      },
      deleteButtonPosition: null
    };
  },
  watch: {
    value(val) {
      this.relationConfig.x = this.value.x;
      this.relationConfig.y = this.value.y;
    }
  },
  methods: {
    handleMove() {
      this.relationConfig.x = this.$refs.relation.getStage().x();
      this.relationConfig.y = this.$refs.relation.getStage().y();

      this.$emit("input", {
        ...this.value,
        x: this.relationConfig.x,
        y: this.relationConfig.y
      });
    },
    getStage() {
      return this.$refs.relation.getStage();
    }
  },
  arranger() {
    return {
      element: this.$refs.relation.getStage(),
      update: () => {
        this.handleMove()
      }
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.deleteButtonPosition = new PositionAnchor(
        this.$refs.rombus,
        this.$refs.deleteButton,
        {
          right: 0,
          top: 0,
          bottom: 0
        }
      );
    });
  }
};
</script>
