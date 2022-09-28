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
// package imports
import getSymbolFromCurrency from "currency-symbol-map";

// component imports
import LineChart from "@/components/LineChart.vue";
import Loading from "@/components/Loading.vue";
import CircleFlag from "@/components/CircleFlag.vue";
import CurrencyPairSelectorVue from "../components/CurrencyPairSelector.vue";
import PageHeader from "../components/PageHeader.vue";
import ResolutionSelector from "../components/ResolutionSelector.vue";
import LivePrices from "../components/LivePrices.vue";
import FxDetails from "../components/FxDetails.vue";
import DataSourceInfo from "../components/DataSourceInfo.vue";
import DateInfo from "../components/DateInfo.vue";

// vue imports
import { mapState, mapActions } from "vuex";

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
    };
  },
  computed: {
    ...mapState({
      currenciesList: (state) => state.currencyModule.currenciesList,
      baseCurrency: (state) => state.currencyModule.baseCurrency,
      quoteCurrency: (state) => state.currencyModule.quoteCurrency,
      selectedResolution: (state) => state.currencyModule.selectedResolution,
      quotes: (state) => state.currencyModule.quotes,
      loading: (state) => state.currencyModule.loading,
    }),
    livePriceForSelectedCurrency() {
      return this.$store.state.socketModule.livePricesForSelected;
    },
    lastPrice() {
      let price = this.filteredQuotes?.slice(-1)[0]?.close;
      // change number format to currency
      if (this.quoteCurrency && getSymbolFromCurrency(this.quoteCurrency)) {
        price = getSymbolFromCurrency(this.quoteCurrency) + " " + String(price);
      } else if (this.quoteCurrency) {
        price = this.quoteCurrency + " " + String(price);
      }
      return price;
    },
    changeOfPrice() {
      let lastPrice = this.filteredQuotes?.slice(-1)[0]?.close;
      let firstPrice = this.filteredQuotes?.slice(1)[0]?.close;

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
      if (this.filteredQuotes) {
        return {
          labels: this.filteredQuotes.map((quote) => quote.date),
          data: this.filteredQuotes.map((quote) => quote.close),
        };
      }
      return null;
    },
    filteredQuotes() {
      if (this.selectedResolution === "15M") {
        return this.quotes.slice(-15);
      } else if (this.selectedResolution === "1H") {
        return this.quotes.slice(-12);
      } else {
        return this.quotes;
      }
    },
  },
  methods: {
    ...mapActions([
      "getCurrenciesList",
      "setBaseCurrency",
      "setQuoteCurrency",
      "getTimeSeriesDataForTwoCurrency",
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
      }
    },
    async currencyChanged() {
      if (this.baseCurrency && this.quoteCurrency) {
        await this.getTimeSeriesDataForTwoCurrency();
        this.startWebSocket();
      }
    },
  },
  created() {
    this.getCurrenciesList();
  },
};
</script>
<style></style>
