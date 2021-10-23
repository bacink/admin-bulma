<template>
  <input ref="inputRef" type="text" :value="formattedValue" />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    options: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup(props) {
    const { formattedValue, inputRef } = useCurrencyInput(props.options)

    return { inputRef, formattedValue }
  },
}
</script>
