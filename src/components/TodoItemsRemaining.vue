<template>
  <div>{{ remainingTodo }} tasks left</div>
</template>

<script>
export default {
  name: "todo-items-remaining",
  props: {
    remainingTodo: {
      type: Number,
      required: true
    }
  }
};
</script>

