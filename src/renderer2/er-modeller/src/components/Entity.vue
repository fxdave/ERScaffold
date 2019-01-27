<template>
  <v-group ref="entity" :config="entity" @dragmove="handleDrag">
    <v-rect ref="bg" :config="bg"></v-rect>
    <editable-text ref="text" v-model="value.name" :config="text"></editable-text>
    <delete-button ref="deleteButton" @click="handleDelete"></delete-button>
    <add-button ref="addButton" @click="handleAddProperty"></add-button>
    <has-many ref="hasMany" @connect="handleHasManyConnect"></has-many>
    <has-one ref="hasOne" @connect="handleHasOneConnect"></has-one>
    <belongs-to-many ref="belongsToMany" @connect="handleBelongsToManyConnect"></belongs-to-many>
  </v-group>
</template>

<script>
import EditableText from "./EditableText.vue";
import DeleteButton from "./DeleteButton.vue";
import AddButton from "./AddButton.vue";
import HasMany from "./HasManyConnectorHandle.vue";
import HasOne from "./HasOneConnectorHandle.vue";
import BelongsToMany from "./BelongsToManyConnectorHandle.vue";
import CustomAnchor from "../Utils/Anchors/CustomAnchor.js";
import PositionAnchor from "../Utils/Anchors/PositionAnchor.js";
import CenterAnchor from "../Utils/Anchors/CenterAnchor.js";
import WidthAnchor from "../Utils/Anchors/WidthAnchor.js";
import Style from "../Utils/Style.js";
import BoundingBox from "../Utils/Arranger/BoundingBox.js";

export default {
  components: {
    EditableText,
    DeleteButton,
    AddButton,
    HasMany,
    HasOne,
    BelongsToMany
  },
  props: ["value"],
  data() {
    return {
      bg: {
        width: 50,
        height: 50,
        cornerRadius: 10,
        fill: "#2f2f2f"
      },
      entity: {
        x: this.value.x,
        y: this.value.y,
        draggable: true
      },
      text: {
        fontSize: 22,
        fill: "#fff",
        fontFamily: "Open Sans"
      }
    };
  },
  methods: {
    getPosition() {
      return this.value;
    },
    handleDrag() {
      this.value.x = this.$refs.entity.getStage().x();
      this.value.y = this.$refs.entity.getStage().y();
      this.$emit("input", this.value);
      
    },
    handleDelete() {
      this.$emit("delete", this.value);
    },
    handleAddProperty() {},
    handleHasManyConnect(e) {
      this.$emit("connect", {
        type: "hasMany",
        from: this,
        to: e
      });
    },
    handleHasOneConnect(e) {
      this.$emit("connect", {
        type: "hasOne",
        from: this,
        to: e
      });
    },
    handleBelongsToManyConnect(e) {
      this.$emit("connect", {
        type: "belongsToMany",
        from: this,
        to: e
      });
    }
  },
  mounted() {
    const anchors = {
      bgPos: new CenterAnchor(this.$refs.bg),
      bgSize: new WidthAnchor(this.$refs.text, this.$refs.bg, {
        padding: 20
      }),
      textPos: new PositionAnchor(this.$refs.bg, this.$refs.text, {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }),

      deleteButtonPos: new PositionAnchor(
        this.$refs.bg,
        this.$refs.deleteButton,
        {
          top: -5,
          right: -5
        }
      ),

      propertyAddButtonPos: new PositionAnchor(
        this.$refs.bg,
        this.$refs.addButton,
        {
          top: -11,
          right: 16
        }
      ),

      hasManyPos: new PositionAnchor(this.$refs.bg, this.$refs.hasMany, {
        right: 4,
        bottom: 4
      }),

      hasOnePos: new PositionAnchor(this.$refs.bg, this.$refs.hasOne, {
        right: 4,
        bottom: 4
      }),

      belongsToMany: new PositionAnchor(
        this.$refs.bg,
        this.$refs.belongsToMany,
        {
          right: 4,
          bottom: 4
        }
      )
    };
  },
  arranger() {
    return {
      element: this.$refs.entity.getStage(),
      update: () => {
        this.handleDrag()
      },
      boundingShape: (element, to) => {
        return BoundingBox(this.$refs.bg.getStage(), to)
      }
    };
  },
  styles: {
    bg: new Style({
      zIndex: 1,
      width: 50,
      height: 50,
      cornerRadius: 10,
      fill: "#2f2f2f"
    }),
    deleteButton: new Style({
      zIndex: 2,
      opacity: 0.5,
      hover: {
        opacity: 1
      }
    }),
    text: new Style({
      zIndex: 9,
      fontSize: 22,
      fill: "#fff",
      fontFamily: "Open Sans"
    }),
    addButton: new Style({
      zIndex: 9,
      duration: 0.2,
      opacity: 0.5,
      hover: {
        opacity: 1
      }
    }),
    hasMany: new Style({
      zIndex: 0,
      rotation: 22.5,
      opacity: 1,
      hover: {
        opacity: 0.5
      }
    }),
    hasOne: new Style({
      zIndex: 0,
      rotation: 67.5,
      opacity: 1,
      hover: {
        opacity: 0.5
      }
    }),
    belongsToMany: new Style({
      zIndex: 0,
      rotation: 112.5,
      opacity: 1,
      hover: {
        opacity: 0.5
      }
    })
  }
};
</script>
