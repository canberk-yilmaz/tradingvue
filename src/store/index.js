import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import socketModule from "./modules/socketModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currenciesList: null,
    baseCurrency: null,
    quoteCurrency: null,
    selectedResolution: "15M",
    resolutionList: ["15M", "1H", "1D", "1W", "1M"],
  },
  mutations: {
    SET_CURRENCIES_LIST(state, currenciesList) {
      state.currenciesList = currenciesList;
    },
    SET_BASE_CURRENCY(state, baseCurrency) {
      state.baseCurrency = baseCurrency;
    },
    SET_QUOTE_CURRENCY(state, quoteCurrency) {
      state.quoteCurrency = quoteCurrency;
    },
    SET_RESOLUTION(state, resolution) {
      state.selectedResolution = resolution;
    },
  },
  actions: {
    setResolution({ commit }, resolution) {
      commit("SET_RESOLUTION", resolution);
    },
    swapCurrencies({ commit, state }) {
      let tempBaseCurrency = state.baseCurrency;
      commit("SET_BASE_CURRENCY", state.quoteCurrency);
      commit("SET_QUOTE_CURRENCY", tempBaseCurrency);
    },
    setBaseCurrency({ commit }, baseCurrency) {
      commit("SET_BASE_CURRENCY", baseCurrency);
    },
    setQuoteCurrency({ commit }, quoteCurrency) {
      commit("SET_QUOTE_CURRENCY", quoteCurrency);
    },
    async getCurrenciesList({ commit }) {
      try {
        const res = await axios.get(
          `https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=${process.env.VUE_APP_REST_API_KEY}`
        );
        console.log("res store", res);
        commit("SET_CURRENCIES_LIST", res.data.available_currencies);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: { socketModule },
});
