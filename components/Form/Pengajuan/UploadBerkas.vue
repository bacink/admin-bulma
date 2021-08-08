<template>
  <section>
    <nav class="panel">
      <div class="panel-block">
        <span class="panel-icon">
          <b-icon icon="book" size="is-small"> </b-icon>
        </span>
        Surat Pengantar dari OPD
        <div class="file is-small has-name">
          <label class="file-label">
            <input
              class="file-input"
              @change="uploadFile"
              type="file"
              name="file"
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Small file…
              </span>
            </span>
            <span class="file-name">
              <div v-if="files">
                <div v-for="(item, index) in files" :key="index">
                  {{ item.name }}{{ item.id }}
                </div>
              </div>
            </span>
          </label>
        </div>
      </div>
    </nav>
  </section>
</template>
<script>
export default {
  data() {
    return {
      syaratPengajuan: null,
      idPengajuan: null,
      idSyaratPengajuan: null,
      files: null,
    }
  },
  mounted() {
    this.$axios
      .$get(`/syarat_pengajuan/`)
      .then((resp) => {
        if (resp.success) {
          const data = resp.data
          this.syaratPengajuan = data.data
        }
      })
      .catch((err) => {
        this.$buefy.toast.open({
          message: `Error: ${err.response.data.message}`,
          type: 'is-danger',
          queue: false,
        })
      })
  },
  methods: {
    uploadFile(event) {
      console.log(event.target)
    },
    handleUpload() {
      this.$axios
        .$post('/dokumen/', this.formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((resp) => {
          if (resp.success) {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Success: ${resp.message}`,
              type: 'success',
              queue: false,
            })
            const idPengajuan = resp.data.id
            this.$router.push(`/pengajuan/${idPengajuan}`)
          }
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
