<template>
  <section>
    <div v-for="(item, index) in syaratPengajuan" :key="index">
      <b-field label="Separated filename">
        <b-field class="file is-primary" :class="{ 'has-name': !!item[index] }">
          <b-upload
            v-model="item[index]"
            class="file-label"
            expanded
            @input="handleUpload"
          >
            <span class="file-cta">
              <b-icon class="file-icon" icon="upload"></b-icon>
              <span class="file-label">Click to upload</span>
            </span>
            <span class="file-name" v-if="item[index]">
              {{ item[index].name }}
            </span>
          </b-upload>
        </b-field>
      </b-field>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      syaratPengajuan: null,
      idPengajuan: null,
      idSyaratPengajuan: null,
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
    handleUpload() {
      this.$axios
        .$post('/dokumen', this.formData)
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
