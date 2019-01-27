<template>
  <stage @dblclick="handleAddEntity" ref="stage">
    <v-layer ref="connectionLayer" key="connectionLayer">
      <one-to-one
        v-for="(connection,key) in conns['hasOne']"
        :key="connection.id"
        v-model="conns['hasOne'][key]"
        @delete="handleDeleteConnection"
      ></one-to-one>

      <one-to-many
        v-for="(connection,key) in conns['hasMany']"
        :key="connection.id"
        v-model="conns['hasMany'][key]"
        @delete="handleDeleteConnection"
      ></one-to-many>

      <many-to-many
        v-for="(connection,key) in conns['belongsToMany']"
        :key="connection.id"
        v-model="conns['belongsToMany'][key]"
        @delete="handleDeleteConnection"
      ></many-to-many>
    </v-layer>

    <v-layer ref="entityLayer" key="entityLayer">
      <entity
        v-for="(entity,key) in entities"
        :key="entity.id"
        v-model="entities[key]"
        @delete="handleDeleteEntity"
        @connect="handleConnectEntity"
      ></entity>
    </v-layer>

    <v-layer ref="tempLayer" key="tempLayer"></v-layer>
    <slot></slot>
  </stage>
</template>

<script>
import Stage from "./Stage.vue";
import Entity from "./Entity.vue";
import EntityModel from "../../../../main/model/Entity.js";
import ConnectionModel from "../../../../main/model/Connection.js";

import OneToOne from "./connections/OneToOne.vue";
import OneToMany from "./connections/OneToMany.vue";
import ManyToMany from "./connections/ManyToMany.vue";

export default {
  components: {
    Stage,
    Entity,
    OneToOne,
    OneToMany,
    ManyToMany
  },
  data: function() {
    return {
      entities: [],
      conns: {
        hasOne: [],
        hasMany: [],
        belongsToMany: []
      }
    };
  },
  methods: {
    handleAddEntity(e) {
      let x = this.$refs.stage.subtractDragX(e.evt.clientX);
      let y = this.$refs.stage.subtractDragY(e.evt.clientY);

      this.entities.push(
        new EntityModel(this.getNextID(this.entities), "Music", [], x, y)
      );
    },
    handleDeleteEntity(e) {
      console.log("Entity has been deleted");
      this.entities = this.entities.filter(entity => entity.id != e.id);
    },
    handleConnectEntity(e) {
      let conn = new ConnectionModel(
        e.from,
        e.to,
        e.type,
        "",
        this.getNextID(
          this.conns["hasOne"].concat(
            this.conns["hasMany"],
            this.conns["belongsToMany"]
          )
        )
      );
      this.conns[e.type].push(conn);
    },
    handleDeleteConnection(e) {
      console.log("Connection has been deleted");
      this.conns[e.type] = this.conns[e.type].filter(conn => conn.id != e.id);
    },
    /**
     * TODO: This function is logically shouldn't be here
     */
    getNextID(arr) {
      return (
        arr.reduce((acc, x) => {
          if (x.id > acc) return x.id;
          return acc;
        }, 0) + 1
      );
    }
  },
  mounted() {
    this.$store.commit("addLayer", {
      name: "entityLayer",
      layer: this.$refs.entityLayer.getStage()
    });

    this.$store.commit("addLayer", {
      name: "connectionLayer",
      layer: this.$refs.connectionLayer.getStage()
    });

    this.$store.commit("addLayer", {
      name: "tempLayer",
      layer: this.$refs.tempLayer.getStage()
    });
  }
};
</script>