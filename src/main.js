import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy';
import '@mdi/font/css/materialdesignicons.css'


Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconPack: 'mdi',
});

new Vue({
  render: h => h(App),
}).$mount('#app')
