<template></template>
<script>
import CurrencyInput from '@/components/CurrencyInput.vue'

export default {
  components: { CurrencyInput },
  props: {
    formData: {
      type: Object,

      default() {
        return {}
      },
    },
  },
}
</script>
