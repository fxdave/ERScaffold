<template>
  <connection @delete="handleDelete"
    :value="value"
    @input="val => $emit('input', val)">
    <one
      slot-scope="connect"
      slot="from"
      :from="connect.from"
      :trough="connect.rel"
      :to="connect.to"
      :normal="1"
    ></one>
    <many
      slot-scope="connect"
      slot="to"
      :from="connect.to"
      :trough="connect.rel"
      :to="connect.from"
      :normal="-1"
    ></many>
  </connection>
</template>

<script>
import Connection from "./Connection.vue";
import One from "../One.vue";
import Many from "../Many.vue"
export default {
  props: ["value"],
  components: {
    Connection,
    One,
    Many
  },
  methods: {
    handleDelete() {
      this.$emit("delete", this.value);
    }
  }
};
</script>
