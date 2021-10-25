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
      href="#"
      target="_blank"
      icon-left="pdf-box"
      type="is-danger"
      size="is-small"
    >
      Surat Pengantar Belum diupload
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
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
      this.isLoading = true
      this.$axios
        .$get(`/surat/pengantar/pengajuan/pdf/${this.idPengajuan}`)
        .then((resp) => {
          setInterval(() => {
            this.isLoading = false
          }, 3 * 1000)
          this.dokumen = resp.data
        })
    },
  },
}
</script>
