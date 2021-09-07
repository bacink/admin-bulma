<template>
  <div>
    <form @submit.prevent="submit">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Form Upload Surat Pengantar</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-input type="hidden" :value="idPengajuan" required> </b-input>
          <b-input type="hidden" :value="tanggal" required> </b-input>
          <b-field label="Nomor Surat">
            <b-input v-model="nomor" required></b-input>
          </b-field>
          <b-notification
            v-if="validation.error"
            type="is-danger is-light"
            aria-close-label="Close notification"
            role="alert"
          >
            {{ validation.error.nomor[0] }}
          </b-notification>
          <b-field label="Tanggal Surat">
            <b-datepicker
              v-model="date"
              :locale="locale"
              placeholder="Type or select a date..."
              icon="calendar-today"
              editable
              required
            >
            </b-datepicker>
          </b-field>
          <b-field class="file">
            <b-upload v-model="file" expanded>
              <a class="button is-warning is-fullwidth">
                <b-icon icon="upload"></b-icon>
                <span>{{ file.name || 'Pilih File' }}</span>
              </a>
            </b-upload>
          </b-field>
          <b-notification
            v-if="validation.error"
            type="is-danger is-light"
            aria-close-label="Close notification"
            role="alert"
          >
            {{ validation.error.lampiran[0] }}
          </b-notification>
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
  </div>
</template>

<script>
export default {
  props: {
    idPengajuan: {
      type: Number,
      default: null,
    },
    isFullPage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      file: {},
      isLoading: false,
      nomor: null,
      date: null,
      locale: 'id-ID',
      validation: [],
    }
  },
  computed: {
    // a computed getter
    tanggal() {
      const date = new Date(this.date)
      const tgl = date.getDate()
      const bulan = date.getMonth() + 1
      const tahun = date.getFullYear()
      return tahun + '-' + bulan + '-' + tgl
    },
  },
  methods: {
    submit() {
      const formData = new FormData()

      this.isLoading = true
      formData.append('id_pengajuan', this.idPengajuan)
      formData.append('nomor', this.nomor)
      formData.append('tanggal', this.tanggal)
      formData.append('lampiran', this.file)

      this.$axios
        .post(`/surat_pengantar`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((r) => {
          this.$buefy.toast.open({
            message: `Success: ${r.data.message}`,
            type: 'is-success',
          })
          this.$router.go() // Refreshes page
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
<style>
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
