import Vue from 'vue'
import Vuex from 'vuex'

import appuser from './userStore'
import appSetting from './appSettingStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appuser,
    appSetting
  }
})