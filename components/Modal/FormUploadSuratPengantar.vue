<template>
  <form @submit.prevent="submit">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Form Upload Surat Pengantar</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-input type="hidden" :value="idPengajuan" required> </b-input>
        <b-field class="file">
          <b-upload v-model="file" expanded>
            <a class="button is-warning is-fullwidth">
              <b-icon icon="upload"></b-icon>
              <span>{{ file.name || 'Pilih File' }}</span>
            </a>
          </b-upload>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button
          label="Upload"
          type="is-primary"
          :loading="isLoading"
          native-type="submit"
        />
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
    idSyaratPengajuan: {
      type: Number,
      default: null,
    },
    idPengajuan: {
      type: Number,
      default: null,
    },
    idDokumen: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      file: {},
      isLoading: false,
    }
  },
  methods: {
    submit() {
      const formData = new FormData()
      this.isLoading = true
      formData.append('file', this.file)
      formData.append('id_pengajuan', this.idPengajuan)

      this.$axios
        .post(`/dokumen`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((r) => {
          this.$buefy.toast.open({
            message: `Error: ${r.data.message}`,
            type: 'is-success',
          })
          this.$router.go() // Refreshes page
          this.isLoading = false
          this.$parent.close()
        })
        .catch((err) => {
          this.$buefy.toast.open({
            message: `Error: ${err.response.data.error.file}`,
            type: 'is-danger',
          })
        })
    },
  },
}
</script>
