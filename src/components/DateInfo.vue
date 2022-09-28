<template>
  <h1
    v-if="startDateOfData && endDateOfData"
    class="p-3 text-center text-lg font-bold"
  >
    Between
    <span v-if="selectedResolution === '15M' || selectedResolution === '11H'">
      {{ startDateOfData }} and {{ endDateOfData }}
    </span>
    <span v-else>
      {{ startDateOfData.substring(0, 10) }} and
      {{ endDateOfData.substring(0, 10) }}
    </span>
  </h1>
</template>
<script>
export default {
  name: "DateInfo",
  props: {
    startDateOfData: {
      type: String,
      default: null,
    },
    endDateOfData: {
      type: String,
      default: null,
    },
  },
  computed: {
    selectedResolution() {
      return this.$store.state.selectedResolution;
    },
  },
};
</script>
