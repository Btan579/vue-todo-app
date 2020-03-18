<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="A task that needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group name="fade" enter-active-class="zoomIn" leave-active-class="rotateOut">
      <todo-item
        v-for="todo in todosArrFiltered"
        :key="todo.id"
        :todo="todo"
        :checkAll="!anyRemainingTasks"
      ></todo-item>
    </transition-group>

    <div class="footer check-container">
      <todo-check-all :anyRemainingTasks="anyRemainingTasks"></todo-check-all>
      <todo-items-remaining :remainingTodo="remainingTodo"></todo-items-remaining>
    </div>

    <div class="footer button-container">
      <todo-filtered></todo-filtered>
      <transition name="fade">
        <todo-clear-completed :showClearCompletedButton="showClearCompletedButton"></todo-clear-completed>
      </transition>
    </div>
  </div>
</template>
<script>
import TodoItem from "./TodoItem";
import EventBus from "../event-bus";
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
      idForTodo: 4,
      beforeEditCache: "",
      filter: "all",
      todosArr: [
        {
          id: 1,
          title: "Clean the bathroom",
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: "Mow the lawn",
          completed: false,
          editing: false
        },
        {
          id: 3,
          title: "Brush Adams teeth",
          completed: false,
          editing: false
        }
      ]
    };
  },
  created() {
    EventBus.$on("removedTodo", index => this.removeTodo(index));
    EventBus.$on("finishedEdit", data => this.finishedEdit(data));
    EventBus.$on("checkAllChanged", checked => this.checkAllTodos(checked));
    EventBus.$on("filterChanged", filter => (this.filter = filter));
    EventBus.$on("clearCompletedTodos", () => this.clearCompleted());
  },
  beforeDestroy() {
    EventBus.$off("removedTodo", index => this.removeTodo(index));
    EventBus.$off("finishedEdit", data => this.finishedEdit(data));
    EventBus.$off("checkAllChanged", checked => this.checkAllTodos(checked));
    EventBus.$off("filterChanged", filter => (this.filter = filter));
    EventBus.$off("clearCompletedTodos", () => this.clearCompleted());
  },
  computed: {
    remainingTodo() {
      return this.todosArr.filter(todo => !todo.completed).length;
    },
    anyRemainingTasks() {
      return this.remainingTodo !== 0;
    },
    todosArrFiltered() {
      if (this.filter == "all") {
        return this.todosArr;
      } else if (this.filter == "active") {
        return this.todosArr.filter(todo => !todo.completed);
      } else if (this.filter == "completed") {
        return this.todosArr.filter(todo => todo.completed);
      }
      return this.todosArr;
    },
    showClearCompletedButton() {
      return this.todosArr.filter(todo => todo.completed).length > 0;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.todosArr.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false
      });

      this.newTodo = "";
      this.idForTodo++;
    },
    checkAllTodos() {
      this.todosArr.forEach(todo => (todo.completed = event.target.checked));
    },
    removeTodo(id) {
      const index = this.todosArr.findIndex(item => item.id == id);
      this.todosArr.splice(index, 1);
    },
    clearCompleted() {
      this.todosArr = this.todosArr.filter(todo => !todo.completed);
    },
    finishedEdit(data) {
      const index = this.todosArr.findIndex(item => item.id == data.id);
      this.todosArr.splice(index, 1, data);
    }
  }
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  &:focus {
    outline: 0;
  }
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
}

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
  background-color: white;
  appearance: none;
  &:hover {
    background: lightgreen;
  }
  &:focus {
    outline: none;
  }
}

.active {
  background: lightgreen;
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

//  enter-active-class="zoomIn"
//       leave-active-class="rotateOut"
</style>
