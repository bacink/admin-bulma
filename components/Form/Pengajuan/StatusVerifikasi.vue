<template>
  <div v-if="verifikasi">
    <div v-if="verifikasi.status === 'tms'" class="control">
      <b-taglist attached>
        <b-tag type="is-danger">TMS</b-tag>
        <b-tag type="is-dark">{{ verifikasi.keterangan }}</b-tag>
      </b-taglist>
    </div>
    <div v-else class="control">
      <b-taglist attached>
        <b-tag type="is-success">MS</b-tag>
        <b-tag type="is-dark">Memenuhi syarat</b-tag>
      </b-taglist>
    </div>
  </div>
  <div v-else>
    <b-field>
      <b-tag type="is-warning"> Belum diverifikasi</b-tag>
    </b-field>
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
      verifikasi: null,
      isLoading: true,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$axios
        .$get(`/verifikasi/${this.idPengajuan}/${this.idSyaratPengajuan}`)
        .then((resp) => {
          this.isLoading = false
          this.verifikasi = resp.data
        })
    },
  },
}
</script>
