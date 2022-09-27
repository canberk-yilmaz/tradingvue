import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currenciesList: null,
  },
  mutations: {
    SET_CURRENCIES_LIST(state, currenciesList) {
      state.currenciesList = currenciesList;
    },
  },
  actions: {
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
  modules: {},
});
