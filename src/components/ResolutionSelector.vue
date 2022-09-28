<template>
  <div class="time-frame flex items-center justify-center">
    <button
      v-for="resolution in resolutionList"
      :key="resolution"
      @click="selectResolutionMethod(resolution)"
      class="m-3 px-2 py-1"
      :class="
        resolution === selectedResolution
          ? 'bg-blue-300 font-bold'
          : 'hover:text-gray-400'
      "
    >
      {{ resolution }}
    </button>
  </div>
</template>
<script>
export default {
  name: "ResolutionSelector",
  props: {},
  data() {
    return {};
  },
  methods: {
    selectResolutionMethod(resolution) {
      this.$emit("resolutionSelected", resolution);
    },
  },
  computed: {
    selectedResolution() {
      return this.$store.state.selectedResolution;
    },
    resolutionList() {
      return this.$store.state.resolutionList;
    },
  },
};
</script>
