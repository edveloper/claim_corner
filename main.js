import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Make sure the router path is correct

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
