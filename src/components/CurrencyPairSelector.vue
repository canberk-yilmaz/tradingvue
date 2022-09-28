<template>
  <section class="lg:mr-10 lg:w-1/3 flex flex-col items-center justify-center">
    <div class="relative inline-flex self-center">
      <select
        v-model="baseCurrency"
        class="text-l font-bold rounded border-2 border-gray-600 text-gray-600 h-14 w-60 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
      >
        <option disabled selected value="null">Select Currency</option>

        <option
          v-for="(currency, symbol) in currenciesList"
          :key="symbol"
          :value="symbol"
          :disabled="symbol === quoteCurrency"
        >
          {{ currency }}
        </option>
      </select>
      <img
        src="@/assets/dropdown-arrow.svg"
        alt="dropdown-arrow"
        class="absolute h-10 w-10 top-0 right-0 m-2 pointer-events-none p-2 rounded"
      />
    </div>
    <button
      @click="swapCurrencies"
      :disabled="!bothCurrenciesSelected"
      :class="!bothCurrenciesSelected ? 'pointer-events-none' : ''"
    >
      <img
        src="@/assets/swap.svg"
        alt="swap icon for changing currencies"
        :style="{ opacity: bothCurrenciesSelected ? 1 : 0.3 }"
      />
    </button>
    <div class="relative inline-flex self-center">
      <select
        v-model="quoteCurrency"
        class="text-l font-bold rounded border-2 border-gray-600 text-gray-600 h-14 w-60 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
      >
        <option disabled selected value="null">Select Currency</option>

        <option
          v-for="(currency, symbol) in currenciesList"
          :key="symbol"
          :value="symbol"
          :disabled="symbol === baseCurrency"
        >
          {{ currency }}
        </option>
      </select>
      <img
        src="@/assets/dropdown-arrow.svg"
        alt="dropdown-arrow"
        class="absolute h-10 w-10 top-0 right-0 m-2 pointer-events-none p-2 rounded"
      />
    </div>
  </section>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "CurrencyPairSelector",
  data() {
    return {
      baseCurrency: null,
      quoteCurrency: null,
    };
  },
  methods: {
    ...mapActions(["setBaseCurrency", "setQuoteCurrency"]),
    swapCurrencies() {
      this.$store.dispatch("swapCurrencies");
      this.baseCurrency = this.$store.state.currencyModule.baseCurrency;
      this.quoteCurrency = this.$store.state.currencyModule.quoteCurrency;
    },
  },
  computed: {
    bothCurrenciesSelected() {
      return Boolean(this.baseCurrency) && Boolean(this.quoteCurrency);
    },
    currenciesList() {
      return this.$store.state.currencyModule.currenciesList;
    },
  },
  watch: {
    baseCurrency: {
      handler: function () {
        this.setBaseCurrency(this.baseCurrency);
        this.$emit("currencyChanged");
      },
      immediate: true,
    },
    quoteCurrency: {
      handler: function () {
        this.setQuoteCurrency(this.quoteCurrency);
        this.$emit("currencyChanged");
      },
      immediate: true,
    },
  },
};
</script>
