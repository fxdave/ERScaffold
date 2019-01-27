import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layers: {}
  },
  mutations: {
    addLayer(state,details) {
      state.layers[details.name] = details.layer
    }
  },
  actions: {

  },
  getters: {
    getLayer: (state) => (name) => {
      return state.layers[name]
    }
  }
})
