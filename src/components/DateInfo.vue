<template>
  <h1
    v-if="startDateOfData && endDateOfData"
    class="p-3 text-center text-lg font-bold"
  >
    Between
    <span v-if="selectedResolution === '1W' || selectedResolution === '1M'">
      {{ startDateOfData.substring(0, 10) }} and
      {{ endDateOfData.substring(0, 10) }}
    </span>
    <span v-else> {{ startDateOfData }} and {{ endDateOfData }} </span>
  </h1>
</template>
<script>
export default {
  name: "DateInfo",
  computed: {
    selectedResolution() {
      return this.$store.state.currencyModule.selectedResolution;
    },
    startDateOfData() {
      return this.$store.state.currencyModule.startDateOfData;
    },
    endDateOfData() {
      return this.$store.state.currencyModule.endDateOfData;
    },
  },
};
</script>
