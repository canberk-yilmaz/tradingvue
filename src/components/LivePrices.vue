<template>
  <div>
    <div
      class="shadow-2xl rounded-xl"
      v-if="$store.state.socketModule.trackLivePrices"
    >
      <div v-if="livePriceForSelectedCurrency" class="py-5">
        <h1 class="font-extrabold text-2xl uppercase m-2 lg:p-2 animate-pulse">
          Live Prices...
        </h1>
        <h2 class="my-4 font-bold">
          <span class="">Currency Pair: </span>
          {{ livePriceForSelectedCurrency.currencyPair }}
        </h2>
        <div
          class="flex justify-around items-center font-semibold lg:mx-40 mx-20 my-2"
        >
          <h2
            class="p-4 m-2 lg:mx-0 mx-auto shadow-md rounded-xl w-min bg-gray-50"
          >
            Ask: {{ livePriceForSelectedCurrency.ask | changeDecimals(5) }}
          </h2>
          <h2
            class="p-4 m-2 lg:mx-0 mx-auto shadow-md rounded-xl w-min bg-gray-50"
          >
            Bid: {{ livePriceForSelectedCurrency.bid | changeDecimals(5) }}
          </h2>
          <h2
            class="p-4 m-2 lg:mx-0 mx-auto shadow-md rounded-xl w-min bg-gray-50"
          >
            Mid: {{ livePriceForSelectedCurrency.mid | changeDecimals(5) }}
          </h2>
        </div>
      </div>
      <div v-else class="my-10">
        <h1 class="font-extrabold text-2xl uppercase animate-pulse m-2 p-2">
          Getting Live Prices...
        </h1>
      </div>
    </div>
    <div
      class="shadow-2xl flex items-center justify-center flex-col p-5"
      v-else-if="baseCurrency && quoteCurrency"
    >
      <h1 class="p-2 m-2 font-bold">
        Live Price Tracking Is Not Available For Selected Currency Pair
      </h1>
      <h2 class="p-2 m-2 font-semibold">
        You can try to swap currencies and check again....
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "LivePrices",
  computed: {
    livePriceForSelectedCurrency() {
      return this.$store.state.socketModule.livePricesForSelected;
    },
    baseCurrency() {
      return this.$store.state.currencyModule.baseCurrency;
    },
    quoteCurrency() {
      return this.$store.state.currencyModule.quoteCurrency;
    },
  },
};
</script>
