<template>
  <div>
    <b-select
      placeholder="Select a Role"
      :value="value"
      @input="$emit('input', $event, value)"
    >
      >
      <template v-if="data"
        ><option v-for="option in data" :key="option.id" :value="option.id">
          {{ option.nama }}
        </option>
      </template>
    </b-select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      data: [],
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$axios
        .$get('/role/')
        .then((data) => {
          return (this.data = data)
        })
        .catch((err) => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false,
          })
        })
    },
  },
}
</script>
