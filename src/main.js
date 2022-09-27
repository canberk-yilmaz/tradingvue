import Vue from "vue";
import App from "./App.vue";
import store from "./store";

//importing css files
import "./index.css";
import "/node_modules/currency-flags/dist/currency-flags.css";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
