<template>
  <div class="currency-details flex justify-between p-3">
    <div class="fx-pair font-extrabold text-2xl">
      {{ baseCurrency }}/{{ quoteCurrency }}
    </div>
    <div class="items-end">
      <h2 class="text-right font-extrabold text-2xl">
        {{ lastPrice }}
      </h2>
      <h3
        class="font-bold text-right"
        :class="changeOfPrice.value > 0 ? 'text-green-400' : 'text-red-400'"
      >
        <span>{{ changeOfPrice.value }}</span>
        <span> ({{ changeOfPrice.percentage }})% </span>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "FxDetails",
  props: {
    lastPrice: {
      type: String,
      default: null,
    },
    changeOfPrice: {
      type: Object,
      required: true,
    },
  },
  computed: {
    baseCurrency() {
      return this.$store.state.currencyModule.baseCurrency;
    },
    quoteCurrency() {
      return this.$store.state.currencyModule.quoteCurrency;
    },
  },
};
</script>
