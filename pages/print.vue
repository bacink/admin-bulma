<template>
  <div>
    <div id="printMe">
      <h1>Print me!</h1>
    </div>
    <b-button @click="print"> print </b-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      output: null,
    }
  },
  methods: {
    print() {
      // Pass the element id here
      this.$htmlToPaper('printMe')
    },
  },
}
</script>
