import Vue from "vue";
import Vuex from "vuex";
import socketModule from "./modules/socketModule";
import currencyModule from "./modules/currencyModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { socketModule, currencyModule },
});
