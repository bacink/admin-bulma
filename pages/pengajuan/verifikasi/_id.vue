<template>
  <div>
    <section class="section">
      <b-card>
        <DetailPengajuan :data="data" />
        <hr />
        <footer class="card-footer">
          <a href="/pengajuan/table" class="card-footer-item">Back</a>
          <a href="#" class="card-footer-item" @click="simpan">Simpan</a>
        </footer>
      </b-card>
    </section>
  </div>
</template>

<script>
import DetailPengajuan from '@/components/Dokumen/DetailPengajuan'

export default {
  components: { DetailPengajuan },
  data() {
    return {
      data: null,
      form: {
        id_pengajuan: this.$route.params.id,
        status: 'diverifikasi_skpd',
      },
    }
  },
  methods: {
    simpan() {
      this.$axios
        .$patch('/pengajuan', this.form)
        .then((resp) => {
          if (resp.success) {
            setTimeout(() => {
              this.isLoading = false

              this.$buefy.snackbar.open({
                message: 'User has been Updated',
                queue: false,
              })
            }, 500)
            this.$router.push({ name: 'pengajuan-table' })
          }
        })
        .catch((err) => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${err.response.data.message}`,
            type: 'is-danger',
            queue: false,
          })
        })
    },
  },
}
</script>
