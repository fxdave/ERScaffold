<template>
  <connection
    @delete="handleDelete"
    :value="value"
    @input="val => $emit('input', val)"
  >
    <one
      slot-scope="connect"
      slot="from"
      :from="connect.from"
      :trough="connect.rel"
      :to="connect.to"
      :normal="1"
    ></one>
    <one
      slot-scope="connect"
      slot="to"
      :from="connect.to"
      :trough="connect.rel"
      :to="connect.from"
      :normal="-1"
    ></one>
  </connection>
</template>

<script>
import Connection from "./Connection.vue";
import One from "../One.vue";
export default {
  props: ["value"],
  components: {
    Connection,
    One
  },
  methods: {
    handleDelete() {
      this.$emit("delete", this.value);
    }
  }
};
</script>
