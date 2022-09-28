import axios from "axios";
import calculateParameters from "../../utils/calculateParameters";

export default {
  state: () => ({
    currenciesList: null,
    baseCurrency: null,
    quoteCurrency: null,
    selectedResolution: "15M",
    resolutionList: ["15M", "1H", "1D", "1W", "1M"],
    quotes: [],
    loading: false,
  }),
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
    async getTimeSeriesDataForTwoCurrency({ commit, state }) {
      console.log("state", state);
      commit("SET_LOADING", true);
      let { startDate, endDate, interval, period } = calculateParameters(
        state.selectedResolution
      );
      try {
        const res = await axios.get(
          `https://marketdata.tradermade.com/api/v1/timeseries?currency=${
            state.baseCurrency + state.quoteCurrency
          }&api_key=${
            process.env.VUE_APP_REST_API_KEY
          }&start_date=${startDate}&end_date=${endDate}&format=records&interval=${interval}&period=${period}`
        );
        commit("SET_START_DATE", res.data.start_date);
        commit("SET_END_DATE", res.data.end_date);
        commit("SET_QUOTES", res.data.quotes);
        commit("SET_LOADING", false);
      } catch (error) {
        console.log(error);
      }
    },
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
    SET_QUOTES(state, quotes) {
      state.quotes = quotes;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_START_DATE(state, startDate) {
      state.startDate = startDate;
    },
    SET_END_DATE(state, endDate) {
      state.endDate = endDate;
    },
  },
  getters: {},
};
