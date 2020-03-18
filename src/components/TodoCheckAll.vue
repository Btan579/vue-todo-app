<template>
  <div>
    <label>
      <input
        type="checkbox"
        :checked="!anyRemainingTasks"
        @change="allChecked"
      />Check All
    </label>
  </div>
</template>

<script>
export default {
  name: "todo-check-all",
  computed: {
    anyRemainingTasks() {
      return this.$store.getters.anyRemainingTasks;
    }
  },
  methods: {
    allChecked() {
      this.$store.commit("checkAll", event.target.checked);
    }
  }
};
</script>
