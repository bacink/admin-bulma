<template>
  <section class="section is-main-section">
    <FormDraft
      :pengantar-kepala="pengantarKepala"
      :data-pengajuan="dataPengajuan"
      :template-surat="templateSurat"
    />
  </section>
</template>
<script>
import FormDraft from '@/components/Form/Draft'
export default {
  components: { FormDraft },
  data() {
    return {
      dataPengajuan: null,
      pengantarKepala: null,
      templateSurat: [],
    }
  },
  mounted() {
    this.getPengajuan()
  },
  methods: {
    getPengajuan() {
      this.isloading = true
      this.$axios
        .$get(`/pengajuan/${this.$route.params.id}`)
        .then(({ data }) => {
          this.dataPengajuan = data
          this.getKepala(data.pegawai.skpd.id)
          this.getTemplateSurat(data.jenis_jafung.id)
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.isloading = false
        })
    },
    getKepala(id) {
      this.isloading = true
      this.$axios
        .$get(`/sotk/skpd/${id}`)
        .then(({ data }) => {
          const pengantarKepala = `${data.jabatan_kepala.nama} ${data.jabatan_kepala.spesifikasi}`
          this.pengantarKepala = pengantarKepala
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.isloading = false
        })
    },
    getTemplateSurat(id) {
      this.isloading = true
      this.$axios
        .$get(`/template/surat/pengajuan/${id}`)
        .then(({ data }) => {
          this.templateSurat = data
        })
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
