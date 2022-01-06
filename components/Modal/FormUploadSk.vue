<template>
  <form @submit.prevent="submit">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Upload Surat Keterangan</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-notification
          v-if="validation.error"
          type="is-danger is-light"
          aria-close-label="Close notification"
          role="alert"
        >
          {{ validation.error.dokumen[0] }}
        </b-notification>
        <b-field class="file">
          <b-upload v-model="dokumen" expanded>
            <a class="button is-warning is-fullwidth">
              <b-icon icon="upload"></b-icon>
              <span>{{ dokumen.name || 'Pilih File' }}</span>
            </a>
          </b-upload>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button native-type="submit" label="Upload" type="is-primary" />
      </footer>
      <b-loading
        v-model="isLoading"
        :is-full-page="isFullPage"
        :can-cancel="true"
      ></b-loading>
    </div>
  </form>
</template>
<script>
export default {
  props: {
    id: {
      default: 0,
      type: Number,
    },
    reupload: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      isLoading: false,
      isFullPage: true,
      dokumen: {},
      validation: [],
    }
  },

  methods: {
    submit() {
      const formData = new FormData()

      if (this.dokumen.size > 1024 * 1024) {
        alert('File too big (> 1MB)')
        this.dokumen = {}
        return
      }

      this.isLoading = true
      formData.append('id', this.id)
      formData.append('dokumen', this.dokumen)
      formData.append('reupload', this.reupload)

      this.$axios
        .post(`/surat/keputusan/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((r) => {
          this.$buefy.toast.open({
            message: `Success: ${r.data.message}`,
            type: 'is-success',
          })
          // this.$router.go() // Refreshes page
          this.isLoading = false
          this.$parent.close()
        })
        .catch((err) => {
          this.validation = err.response.data
          this.isLoading = false
        })
    },
  },
}
</script>
<style scoped>
.modal {
  position: fixed !important;
  overflow: auto !important;
}
.modal-background {
  position: fixed !important;
}
.modal-content {
  overflow: visible !important;
}
.modal-card {
  overflow: visible !important;
}
.modal-card-body {
  overflow: visible !important;
}
</style>
