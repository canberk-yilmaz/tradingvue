<template>
  <h2
    class="bg-gray-100 text-gray-500 px-4 py-1 rounded-full font-bold text-sm"
  >
    {{ dataSource }}
  </h2>
</template>
<script>
export default {
  name: "DataSourceInfo",
  props: {
    dataSource: {
      type: String,
      default: null,
    },
  },
};
</script>
