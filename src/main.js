import Vue from 'vue'
import App from './App.vue'

var Icon = require('vue-awesome')

Vue.component('v-icon', Icon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
