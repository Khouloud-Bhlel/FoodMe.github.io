import Vue from 'vue'
import Vuex from 'vuex'

import appuser from './userStore'
import appSetting from './appSettingStore'
import products from './produitStore'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appuser,
    appSetting,
    products
  }
})