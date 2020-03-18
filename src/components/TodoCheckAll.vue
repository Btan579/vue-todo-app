<template>
  <div>
    <label>
      <input type="checkbox" :checked="!anyRemainingTasks" @change="allChecked" />Check All
    </label>
  </div>
</template>

<script>
import EventBus from "../event-bus";
export default {
  name: "todo-check-all",
  props: {
    anyRemainingTasks: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    allChecked() {
      EventBus.$emit("checkAllChanged", this.anyRemainingTasks);
    }
  }
};
</script>

