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
      isloading: true,
    }
  },
  mounted() {
    this.getPengajuan()
  },
  methods: {
    print() {
      // Pass the element id here
      this.$htmlToPaper('printMe')
    },
    getPengajuan() {
      this.isloading = true
      this.$axios
        .$get(`/pengajuan/${this.$route.params.id}`)
        .then(({ data }) => {})
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.isloading = false
        })
    },
  },
}
</script>
