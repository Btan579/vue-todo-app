import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
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
        ],

    },
    getters: {
        remainingTodo(state) {
            return state.todosArr.filter(todo => !todo.completed).length;
        },
        anyRemainingTasks(state, getters) {
            return getters.remainingTodo !== 0;
        },
        todosArrFiltered(state) {
            if (state.filter == "all") {
                return state.todosArr;
            } else if (state.filter == "active") {
                return state.todosArr.filter(todo => !todo.completed);
            } else if (state.filter == "completed") {
                return state.todosArr.filter(todo => todo.completed);
            }
            return state.todosArr;
        },
        showClearCompletedButton(state) {
            return (
                state.todosArr.filter(todo => todo.completed).length > 0
            );
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todosArr.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false
            });
        },
        clearCompleted(state) {
            state.todosArr = state.todosArr.filter(
                todo => !todo.completed
            );
        },
        updateFilter(state, filter) {
            state.filter = filter;
        },
        checkAll(state, checked) {
            state.todosArr.forEach(
                todo => (todo.completed = checked)
            );
        },
        deleteTodo(state, id) {
            const index = state.todosArr.findIndex(item => item.id == id);
            state.todosArr.splice(index, 1);
        },
        updateTodo(state, todo) {
            const index = state.todosArr.findIndex(
                item => item.id == todo.id
            );
            state.todosArr.splice(index, 1, {
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing: todo.editing
            });
        },
    }
})