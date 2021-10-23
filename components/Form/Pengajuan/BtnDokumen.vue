<template>
  <div v-if="dokumen">
    <b-button
      :loading="isLoading"
      tag="a"
      :href="dokumen.url"
      target="_blank"
      icon-left="pdf-box"
      type="is-success"
      size="is-small"
    >
      View
    </b-button>
  </div>

  <div v-else>
    <b-button
      disabled
      tag="a"
      href="https://buefy.org"
      target="_blank"
      icon-left="pdf-box"
      type="is-danger"
      size="is-small"
    >
      Silahkan Upload
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    idSyaratPengajuan: {
      type: [Number, String],
      default: null,
    },
    idPengajuan: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      dokumen: null,
      isLoading: true,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$axios
        .$get(
          `/dokumen/pengajuan/pdf/${this.idPengajuan}/${this.idSyaratPengajuan}`
        )
        .then((resp) => {
          this.isLoading = false
          this.dokumen = resp.data
        })
    },
  },
}
</script>
