<template>
  <div v-if="dokumen">
    <div v-if="dokumen.file !== null">
      <b-button
        :loading="isLoading"
        tag="a"
        :href="dokumen.file.url"
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
        Silahkan Upload di SIM-ASN
      </b-button>
    </div>
  </div>
  <div v-else>
    <b-button
      disabled
      tag="a"
      href="https://buefy.org"
      target="_blank"
      icon-left="pdf-box"
      type="is-danger"
    >
      Silahkan Upload di SIM-ASN
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    idPegawai: {
      type: String,
      default: null,
    },
    simpegDokumen: {
      type: String,
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
        .$get(`/simpeg/dokumen/${this.simpegDokumen}/${this.idPegawai}`)
        .then((resp) => {
          if (resp) {
            this.isLoading = false
            const data = resp.data
            this.dokumen = data
          }
        })
        .catch((err) => {
          this.dokumen = null
          throw err
        })
    },
  },
}
</script>
