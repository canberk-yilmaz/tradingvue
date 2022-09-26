<template>
  <div
    :class="`rounded-full bg-center object-center currency-flag currency-flag-${currency.toLowerCase()} mr-2`"
    style="height: 24px; width: 24px"
  ></div>
</template>
<script>
export default {
  props: {
    currency: {
      type: String,
      required: true,
    },
  },
};
</script>
