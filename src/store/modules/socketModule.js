var io = require("socket.io-client");
let counter = 0;
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

export default {
  namespaced: true,
  state: () => ({
    socket: null,
    isConnected: false,
    symbol: "EURUSD",
  }),
  actions: {
    test() {
      console.log("test");
    },
    connectWebSocket({ commit, state, rootState }) {
      //check if both currencies stated
      if (!rootState.baseCurrency && !rootState.quoteCurrency) {
        console.log("1");
        // check if the socket is connected
        if (!state.isConnected) {
          console.log("2");
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
            state.socket.emit("symbolSub", { symbol: state.symbol });
          });

          state.socket.on("price", function (message) {
            var data = message.split(" ");
            console.log(
              "counter",
              counter,
              data[0] +
                " " +
                data[1] +
                " " +
                data[2] +
                " " +
                data[3] +
                " " +
                parseDate(data[4])
            );
            counter++;
          });
        }
      }
    },
    disconnectWebSocket({ commit, state }) {
      if (state.isConnected) {
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
  },
  getters: {},
};
