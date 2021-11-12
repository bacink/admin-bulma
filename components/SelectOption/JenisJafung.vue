<template>
  <b-select
    placeholder="Pilih Jenis Jafung"
    @input="$emit('input', $event, value)"
    :loading="isLoading"
  >
    <template v-if="data"
      ><option v-for="option in data" :key="option.id" :value="option.id">
        {{ option.nama }}
      </option>
    </template>
  </b-select>
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
      isLoading: false,
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.isLoading = true
      this.$axios
        .$get(`/jenis_jafung`)
        .then(({ data }) => {
          this.data = data
        })
        .catch((error) => {
          this.data = []
          throw error
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>