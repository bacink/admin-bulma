<template>
  <form @submit.prevent="submit">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Form Upload</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-input type="hidden" :value="idPengajuan" required> </b-input>
        <b-input type="hidden" :value="idSyaratPengajuan" required> </b-input>
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
      isFullPage: true,
    }
  },
  methods: {
    submit() {
      const formData = new FormData()
      this.isLoading = true
      formData.append('file', this.file)
      formData.append('id_pengajuan', this.idPengajuan)
      formData.append('id_syarat_pengajuan', this.idSyaratPengajuan)

      this.$axios
        .post(`/dokumen`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((r) => {
          this.$buefy.toast.open({
            message: `Success: ${r.data.message}`,
            type: 'is-success',
          })
          this.isLoading = false
          this.$parent.close()
        })
        .catch((err) => {
          this.$buefy.toast.open({
            message: `Error: ${err.response.data.error.file}`,
            type: 'is-danger',
          })
          this.isLoading = false
        })
    },
  },
}
</script>
