import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPhone, faEnvelope, faMapMarkerAlt, faArrowRight, faConciergeBell, faLightbulb, faShip, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/style.css';

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

library.add(faUser, faPhone, faEnvelope, faMapMarkerAlt, faArrowRight, faFacebook, faInstagram, faConciergeBell, faLightbulb, faShip, faCartArrowDown);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueToast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
