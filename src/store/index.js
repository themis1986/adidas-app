import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      text: ''
    }
  },
  mutations: {
    showSnackbar(state, payload) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = payload;
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    }
  },
  actions: {
    openSnackbar(context, payload) {
      context.commit('showSnackbar', payload);
    }
  },
  modules: {}
});
