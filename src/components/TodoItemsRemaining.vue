<template>
  <div>{{ remainingTodo }} tasks left</div>
</template>

<script>
export default {
  name: "todo-items-remaining",
  computed: {
    remainingTodo() {
      return this.$store.getters.remainingTodo;
    }
  }
};
</script>
