import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Import the router instance
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPhone, faEnvelope, faMapMarkerAlt, faArrowRight, faConciergeBell, faLightbulb, faShip, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook ,faInstagram} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/style.css';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

library.add(faUser);
library.add(faPhone);
library.add(faEnvelope);
library.add(faMapMarkerAlt);
library.add(faArrowRight);
library.add(faFacebook, faInstagram);
library.add(faConciergeBell);
library.add(faLightbulb);
library.add(faShip);
library.add(faCartArrowDown);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueToast);

new Vue({
  router, // Add the router instance here
  store,
  render: h => h(App)
}).$mount('#app');
