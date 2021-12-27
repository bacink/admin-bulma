<template>
  <form @submit.prevent="simpan">
    <b-field label="Kode">
      <b-input v-model="formData.kode" :loading="isLoading"></b-input>
    </b-field>
    <b-field label="Nama">
      <b-input v-model="formData.nama" :loading="isLoading"></b-input>
    </b-field>
    <b-field>
      <b-button native-type="submit" label="simpan"> </b-button>
    </b-field>
  </form>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      isLoading: false,
      formData: {
        id: null,
        kode: null,
        nama: null,
      },
    }
  },
  watch: {
    form(newValue) {
      this.isLoading = true
      if (newValue) {
        this.formData = newValue
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      }
    },
  },
  methods: {
    simpan() {
      this.isLoading = true
      if (this.formData.id === null) {
        this.$axios
          .post('/jenis_jafung', this.formData)
          .then((resp) => {
            if (resp.data.success) {
              this.isLoading = false
              this.$buefy.toast.open({
                message: `Success: ${resp.data.message}`,
                type: 'is-success',
                queue: false,
              })
            }
            this.$router.push('/jenis/jafung/table')
          })
          .catch((err) => {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Error: ${Object.values(err.response.data)}`,
              type: 'is-danger',
              queue: false,
            })
          })
      } else {
        this.$axios
          .patch('/jenis_jafung', this.formData)
          .then((resp) => {
            if (resp.data.success) {
              this.isLoading = false
              this.$buefy.toast.open({
                message: `Success: ${resp.data.message}`,
                type: 'is-success',
                queue: false,
              })
            }
            this.$router.push('/jenis/jafung/table')
          })
          .catch((err) => {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Error: ${Object.values(err.response.data)}`,
              type: 'is-danger',
              queue: false,
            })
          })
      }
    },
  },
}
</script>
