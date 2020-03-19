<template>
  <div class="main">
    <input
      type="text"
      class="todo-input"
      placeholder="A task that needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      name="fade"
      enter-active-class="zoomIn"
      leave-active-class="rotateOut"
    >
      <todo-item
        v-for="todo in todosArrFiltered"
        :key="todo.id"
        :todo="todo"
        :checkAll="!anyRemainingTasks"
      ></todo-item>
    </transition-group>

    <div class="footer check-container">
      <todo-check-all></todo-check-all>
      <todo-items-remaining></todo-items-remaining>
    </div>

    <div class="footer button-container">
      <todo-filtered></todo-filtered>
      <transition name="fade">
        <todo-clear-completed></todo-clear-completed>
      </transition>
    </div>
  </div>
</template>
<script>
import TodoItem from "./TodoItem";
import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoCheckAll from "./TodoCheckAll";
import TodoFiltered from "./TodoFiltered";
import TodoClearCompleted from "./TodoClearCompleted";

export default {
  name: "todo-list",
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 4
    };
  },
  computed: {
    anyRemainingTasks() {
      return this.$store.getters.anyRemainingTasks;
    },
    todosArrFiltered() {
      return this.$store.getters.todosArrFiltered;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.$store.commit("addTodo", {
        id: this.idForTodo,
        title: this.newTodo
      });
      this.newTodo = "";
      this.idForTodo++;
    }
  }
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
.main {
  background-color: #248ea9;
  padding: 30px 15px 5px 15px;
  margin-bottom: 30px;
  border-radius: 25px;
  border-style: solid;
  border-width: 0px 38px 0px 38px;
  -moz-border-image: url(../assets/rope-circle.svg) 0 100 4 100 round round;
  -webkit-border-image: url(../assets/rope-circle.svg) 0 100 4 100 round round;
  -o-border-image: url(../assets/rope-circle.svg) 0 100 4 100 round round;
  border-image: url(../assets/rope-circle.svg) 0 100 4 100 round round;
}
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 30px;
  background-color: #28c3d4;
  color: #fafdcb;
  border-radius: 25px;

  &:focus {
    outline: 0;
  }
}

.todo-input::placeholder {
  color: #fafdcb;
  font-family: "Raleway", sans-serif;
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  color: #fafdcb;
  &:hover {
    color: black;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
  background-color: #28c3d4;
  color: #fafdcb;
  text-shadow: -1px 1px 10px rgba(0, 0, 0, 0.897);
  border-radius: 25px;
}

.todo-item-edit {
  font-size: 24px;
  background-color: #fafdcb;
  color: #248ea9;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  border-radius: 25px;
  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
  font-size: 14px;
  background-color: #fafdcb;
  appearance: none;
  border-radius: 25px;
  margin: 3px;
  &:hover {
    background: #28c3d4;
  }
  &:focus {
    outline: none;
  }
}

.active {
  background: #28c3d4;
}
.check-container {
  color: #fafdcb;
  &:hover {
    background: #d42845;
  }
}

.delete-todo-icon {
  height: 50px;
  width: 50px;
  &:hover {
    background: #d42845;
    border-radius: 25px;
  }
}
// CSS Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
