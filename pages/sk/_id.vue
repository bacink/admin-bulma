<template>
  <section class="section is-main-section">
    <b-card title="Form Surat Keputusan"> <FormSk :data="dataForm" /> </b-card>
  </section>
</template>
<script>
import FormSk from '@/components/Form/Sk'
export default {
  components: { FormSk },

  data() {
    return {
      dataForm: {
        kop_depan: null,
        kop_belakang: null,
        pegawai: {},
        isi: {},
        id_pengajuan: null,
      },
    }
  },
  mounted() {
    this.getDraft()
  },
  methods: {
    getDraft() {
      this.$axios
        .$get(`/draft/pengajuan/${this.$route.params.id}`)
        .then((resp) => {
          const data = resp.data
          this.dataForm.kop_depan = data.kop_depan
          this.dataForm.kop_belakang = data.kop_belakang
          this.dataForm.pegawai = data.isi.pegawai
          this.dataForm.isi = data.isi
          this.dataForm.id_pengajuan = data.id_pengajuan
        })
        .catch((err) => {
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
