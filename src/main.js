import Vue from 'vue'
import App from './App.vue'

import { store } from "./store/store"

Vue.config.productionTip = false



new Vue({
  store,
  computed: {
    todosArr() {
      return store.state.todosArr;
    },
    filter() {
      return store.state.filter;
    }
  },
  render: h => h(App),
}).$mount('#app')
