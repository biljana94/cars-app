import Vue from 'vue'
import App from './App.vue'

import {router} from './router.js'; //importujemo router.js gde nam se nalaze rute

Vue.config.productionTip = false

new Vue({
  router, //navedemo router 
  render: h => h(App),
}).$mount('#app')
