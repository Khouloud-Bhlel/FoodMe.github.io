import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPhone, faEnvelope, faMapMarkerAlt, faArrowRight, faConciergeBell, faLightbulb, faShip } from '@fortawesome/free-solid-svg-icons';
import { faFacebook ,faInstagram} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/styles.css';



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


Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueToast);

// import VueGtag from 'vue-gtag';
// Vue.use(VueGtag, { Config: { id: 'G-RH1MN099PY' } });

// import VueAnalytics from 'vue-analytics';
// Vue.use(VueAnalytics, {
//   id: 'G-RH1MN099PY',
//   router
// });
// createApp(App).use(VueGtag, {
//   config: { id: "GA_MEASUREMENT_ID" }
// }).mount("#app");

// import VueGtag from 'vue-gtag';
// Vue.use(VueGtag, { Config: { id: 'GTM-59JZ4D5' } });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

