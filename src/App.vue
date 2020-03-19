<template>
  <div id="app" class="container">
    <div class="logo-container">
      <img alt="ship logo" class="ship-logo" src="./assets/logo.svg" />
    </div>

    <todo-list></todo-list>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoList
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  max-height: 800px;
  margin: 0 auto;
}
.logo-container {
  text-align: center;
  margin-bottom: 20px;
}
.ship-logo {
  width: 25%;
}
html {
  background-color: #aee7e8;
}
#app {
  font-family: "Raleway", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
  background-color: #aee7e8;
}
</style>
