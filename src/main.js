import Vue from 'vue'
import App from './App.vue'
import router from "./routes";
import  "./firebase";
import store from "./store";
import bulma from './../node_modules/bulma/css/bulma.css';
import { library } from './../node_modules/@fortawesome/fontawesome-svg-core'
import { faUserSecret } from './../node_modules/@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from './../node_modules/@fortawesome/vue-fontawesome'
import vueSignaturePad from "vue-signature-pad"

Vue.use(vueSignaturePad)

require('dotenv').config()

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  bulma,
  render: h => h(App)
}).$mount("#app");