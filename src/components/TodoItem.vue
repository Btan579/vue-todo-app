<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="editDone" />
      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="todo-item-label"
        :class="{ completed: completed }"
      >{{ title }}</div>
      <input
        v-else
        class="todo-item-edit"
        type="text"
        v-model="title"
        @blur="editDone"
        @keyup.enter="editDone"
        @keyup.esc="editCancel"
        v-focus
      />
    </div>
    <div class="remove-item" @click="removeTodo(todo.id)">&times;</div>
  </div>
</template>

<script>
import EventBus from "../event-bus";
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCach: ""
    };
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    removeTodo(id) {
      EventBus.$emit("removedTodo", id);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    editDone() {
      if (this.title.trim() == "") {
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      EventBus.$emit("finishedEdit", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      });
    },
    editCancel(todo) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
    }
  }
};
</script>