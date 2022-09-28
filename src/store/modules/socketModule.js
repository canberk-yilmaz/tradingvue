var io = require("socket.io-client");
var { availablePairsForLive } = require("../../utils/availablePairsForLive");

function parseDate(dateString) {
  var reggie = /(\d{4})(\d{2})(\d{2})-(\d{2}):(\d{2}):(\d{2}).(\d{3})/;
  var dateArray = reggie.exec(dateString);
  var dateObject = new Date(
    +dateArray[1],
    +dateArray[2] - 1, // Careful, month starts at 0!
    +dateArray[3],
    +dateArray[4],
    +dateArray[5],
    +dateArray[6]
  );
  return dateObject;
}

function canSymbolBeTracked(currencyPair) {
  if (availablePairsForLive.includes(currencyPair)) {
    return true;
  }
  return false;
}

export default {
  namespaced: true,
  state: () => ({
    socket: null,
    isConnected: false,
    livePricesForSelected: null,
    trackLivePrices: false,
  }),
  actions: {
    connectWebSocket({ commit, state, rootState }, symbol) {
      if (!canSymbolBeTracked(symbol)) {
        commit("SET_CAN_SYMBOL_BE_TRACKED", false);
        return;
      }
      commit("SET_CAN_SYMBOL_BE_TRACKED", true);
      commit("SET_LIVE_PRICE_FOR_SELECTED_CURRENCY", (state, null));
      //check if both currencies stated
      if (
        rootState.currencyModule.baseCurrency &&
        rootState.currencyModule.quoteCurrency
      ) {
        // check if the socket is connected
        if (!state.isConnected) {
          // connect to the socket
          commit(
            "SET_SOCKET",
            io.connect("https://marketdata.tradermade.com", { reconnect: true })
          );

          state.socket.on("connect", function () {
            console.log("connect");
            state.socket.emit("login", {
              userKey: process.env.VUE_APP_SOCKET_API_KEY,
            });
          });

          state.socket.on("handshake", function (msg) {
            console.log("handshake");
            console.log(msg);
            commit("SET_CONNECTION", true);
            state.socket.emit("symbolSub", { symbol: symbol });
          });

          state.socket.on("price", function (message) {
            var data = message.split(" ");
            let dataObject = {
              currencyPair: data[0],
              ask: data[1],
              bid: data[2],
              mid: data[3],
              date: parseDate(data[4]),
            };
            commit("SET_LIVE_PRICE_FOR_SELECTED_CURRENCY", (state, dataObject));
          });
        }
      }
    },
    disconnectWebSocket({ commit, state }) {
      if (state.isConnected) {
        console.log("disconnection");
        commit("SET_LIVE_PRICE_FOR_SELECTED_CURRENCY", (state, null));
        state.socket.disconnect();
        commit("SET_CONNECTION", false);
      }
    },
  },
  mutations: {
    SET_SOCKET(state, socket) {
      state.socket = socket;
    },
    SET_CONNECTION(state, isConnected) {
      state.isConnected = isConnected;
    },
    SET_LIVE_PRICE_FOR_SELECTED_CURRENCY(state, livePricesForSelected) {
      state.livePricesForSelected = livePricesForSelected;
    },
    SET_CAN_SYMBOL_BE_TRACKED(state, payload) {
      state.trackLivePrices = payload;
    },
  },
  getters: {},
};
