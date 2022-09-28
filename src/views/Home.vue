<template>
  <!-- Container -->
  <div class="md:max-w-5xl mx-auto px-6 py-3 mt-10 lg:flex flex-col">
    <!-- Header and Subtext -->
    <PageHeader />
    <!-- CURRENCY PAIR SELECTION AND FX INFO -->
    <div
      class="flex flex-col lg:flex-row my-10 text-left justify-center items-center flex-1"
      style="min-height: 560px"
    >
      <!-- LEFT SECTION -->
      <!-- Dropdowns -->
      <CurrencyPairSelectorVue @currencyChanged="currencyChanged" />
      <!-- LEFT SECTION END-->

      <!-- RIGHT SECTION -->
      <section
        class="lg:w-2/3 w-full px-2 py-4"
        :class="!loading ? 'shadow-xl rounded-xl' : ''"
      >
        <div v-if="baseCurrency && quoteCurrency && !loading">
          <div id="right-header" class="flex items-center pt-3 px-3">
            <CircleFlag v-if="baseCurrency" :currency="baseCurrency" />
            <CircleFlag v-if="quoteCurrency" :currency="quoteCurrency" />
            <DataSourceInfo dataSource="Tradermade.com" />
          </div>
          <FxDetails :lastPrice="lastPrice" :changeOfPrice="changeOfPrice" />
          <DateInfo
            :startDateOfData="startDateOfData"
            :endDateOfData="endDateOfData"
          />
          <div v-if="chartData" class="chart px-3">
            <LineChart
              :chartData="chartData"
              :isChangePositive="changeOfPrice.value > 0"
              ref="myLineChart"
            />
          </div>
          <ResolutionSelector @resolutionSelected="resolutionSelected" />
        </div>

        <div v-else-if="loading">
          <Loading />
        </div>

        <div v-else class="h-full flex items-center justify-center">
          <span class="font-semibold text-xl">
            Please select a currency pair to see data...
          </span>
        </div>
      </section>
      <!-- RIGHT SECTION END-->
    </div>
    <!-- CURRENCY PAIR SELECTION AND FX INFO END -->
    <!-- LIVE PRICES -->
    <div v-if="!loading">
      <LivePrices />
    </div>
    <div v-else-if="loading">
      <Loading />
    </div>
    <!-- LIVE PRICES END -->
  </div>
  <!-- Container END -->
</template>

<script>
//imports
import axios from "axios";
import LineChart from "@/components/LineChart.vue";
import getSymbolFromCurrency from "currency-symbol-map";
import Loading from "@/components/Loading.vue";
import CircleFlag from "@/components/CircleFlag.vue";
import { mapState, mapActions } from "vuex";
import CurrencyPairSelectorVue from "../components/CurrencyPairSelector.vue";
import PageHeader from "../components/PageHeader.vue";
import ResolutionSelector from "../components/ResolutionSelector.vue";
import LivePrices from "../components/LivePrices.vue";
import FxDetails from "../components/FxDetails.vue";
import DataSourceInfo from "../components/DataSourceInfo.vue";
import DateInfo from "../components/DateInfo.vue";

export default {
  name: "Home",
  components: {
    LineChart,
    Loading,
    CircleFlag,
    CurrencyPairSelectorVue,
    PageHeader,
    ResolutionSelector,
    LivePrices,
    FxDetails,
    DataSourceInfo,
    DateInfo,
  },
  data() {
    return {
      startDateOfData: null,
      endDateOfData: null,
      quotes: null,
      loading: false,
    };
  },
  computed: {
    ...mapState([
      "currenciesList",
      "baseCurrency",
      "quoteCurrency",
      "selectedResolution",
    ]),
    livePriceForSelectedCurrency() {
      return this.$store.state.socketModule.livePricesForSelected;
    },
    lastPrice() {
      let price = this.quotes?.slice(-1)[0]?.close;
      // change number format to currency
      if (this.quoteCurrency && getSymbolFromCurrency(this.quoteCurrency)) {
        price = getSymbolFromCurrency(this.quoteCurrency) + " " + String(price);
      } else if (this.quoteCurrency) {
        price = this.quoteCurrency + " " + String(price);
      }
      return price;
    },
    changeOfPrice() {
      let lastPrice = this.quotes?.slice(-1)[0].close;
      let firstPrice = this.quotes?.slice(1)[0].close;

      return {
        value: Number(lastPrice - firstPrice).toFixed(6),
        percentage: Number((lastPrice - firstPrice) / firstPrice).toFixed(7),
      };
    },

    chartOptions() {
      return {
        responsive: true,
      };
    },
    chartData() {
      if (this.quotes) {
        return {
          labels: this.quotes.map((quote) => quote.date),
          data: this.quotes.map((quote) => quote.close),
        };
      }
      return null;
    },
  },
  methods: {
    ...mapActions([
      "getCurrenciesList",
      "setBaseCurrency",
      "setQuoteCurrency",
      "socketModule/connectWebSocket",
      "socketModule/disconnectWebSocket",
    ]),
    startWebSocket() {
      if (this.$store.state.socketModule.isConnected) {
        this["socketModule/disconnectWebSocket"]();
        this.startWebSocket();
      } else {
        this.baseCurrency && this.quoteCurrency
          ? this["socketModule/connectWebSocket"](
              this.baseCurrency + this.quoteCurrency
            )
          : null;
      }
    },
    // selectResolutionMethod(resolution) {
    //   this.selectedResolution = resolution;
    // },
    async resolutionSelected(resolution) {
      this.$store.dispatch("setResolution", resolution);
      if (this.quoteCurrency && this.baseCurrency) {
        await this.getTimeSeriesDataForTwoCurrency();
        this.sliceQuotes();
      }
    },
    async currencyChanged() {
      if (this.baseCurrency && this.quoteCurrency) {
        await this.getTimeSeriesDataForTwoCurrency();
        this.sliceQuotes();
        this.startWebSocket();
      }
    },

    sliceQuotes() {
      switch (this.selectedResolution) {
        case "15M":
          this.quotes = this.quotes.slice(-15);
          break;
        case "1H":
          this.quotes = this.quotes.slice(-12);
          break;
        default:
          break;
      }
    },
    calculateParameters() {
      let now = new Date();
      let isSunday = now.getDay() === 0;
      let isSaturday = now.getDay() === 6;

      let resolution = this.$store.state.selectedResolution;
      let parameters = {};
      let startDate = new Date();
      isSaturday
        ? startDate.setDate(startDate.getDate() - 1)
        : isSunday
        ? startDate.setDate(startDate.getDate() - 2)
        : startDate;
      switch (resolution) {
        case "15M":
          startDate.setDate(startDate.getDate() - 1);
          parameters = {
            startDate,
            interval: "minute",
            period: 1,
          };
          break;
        case "1H":
          startDate.setDate(startDate.getDate() - 1);
          parameters = {
            startDate,
            interval: "minute",
            period: 5,
          };
          break;
        case "1D":
          startDate.setDate(startDate.getDate() - 1);
          parameters = {
            startDate,
            interval: "hourly",
            period: 1,
          };
          break;
        case "1W":
          startDate.setDate(startDate.getDate() - 7);
          parameters = {
            startDate,
            interval: "daily",
            period: 1,
          };
          break;
        case "1M":
          startDate.setDate(startDate.getDate() - 30);
          parameters = {
            startDate,
            interval: "daily",
            period: 1,
          };
          break;
        default:
          parameters = {
            startDate: null,
            interval: null,
            period: null,
          };
          break;
      }

      let getFridayIfWeekendOrNow = new Date();
      if (isSunday) {
        getFridayIfWeekendOrNow.setDate(getFridayIfWeekendOrNow.getDate() - 2);
      } else if (isSaturday) {
        getFridayIfWeekendOrNow.setDate(getFridayIfWeekendOrNow.getDate() - 1);
      }
      parameters.interval === "daily"
        ? (parameters.endDate = getFridayIfWeekendOrNow
            .toISOString()
            .split("T")[0])
        : (parameters.endDate = getFridayIfWeekendOrNow
            .toISOString()
            .split(".")[0]
            .replace("T", " "));
      parameters.startDate = parameters.startDate?.toISOString().split("T")[0];
      return parameters;
    },
    async getTimeSeriesDataForTwoCurrency() {
      this.loading = true;

      let { startDate, endDate, interval, period } = this.calculateParameters();

      try {
        const res = await axios.get(
          `https://marketdata.tradermade.com/api/v1/timeseries?currency=${
            this.baseCurrency + this.quoteCurrency
          }&api_key=${
            process.env.VUE_APP_REST_API_KEY
          }&start_date=${startDate}&end_date=${endDate}&format=records&interval=${interval}&period=${period}`
        );
        this.startDateOfData = res.data.start_date;
        this.endDateOfData = res.data.end_date;
        this.quotes = res.data.quotes;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getCurrenciesList();
  },
};
</script>
<style></style>
