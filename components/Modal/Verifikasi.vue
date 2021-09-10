<template>
  <div>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Form Verifikasi</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body section">
        <div class="columns is-centered">
          <div class="column is-half box">
            <b-field class="grouped group-multiline">
              <div class="control">
                <span class="button is-static">{{ page }}</span>
                <span class="button is-static">/</span>
                <span class="button is-static">{{ numPages }}</span>
                <b-button
                  type="is-info"
                  icon-left="mdi mdi-rotate-right"
                  @click="rotate += 90"
                ></b-button>
                <b-button
                  type="is-info"
                  icon-left="mdi mdi-rotate-left"
                  @click="rotate -= 90"
                ></b-button>
                <b-button
                  type="is-primary"
                  icon-left="mdi mdi-chevron-left"
                  :disabled="disabled_min"
                  @click="page -= 1"
                ></b-button>
                <b-button
                  type="is-primary"
                  icon-left="mdi mdi-chevron-right"
                  :disabled="disabled_plus"
                  @click="page += 1"
                ></b-button>
              </div>
            </b-field>
            <div
              v-if="loadedRatio > 0 && loadedRatio < 1"
              style="background-color: green; color: white; text-align: center"
              :style="{ width: loadedRatio * 100 + '%' }"
            >
              {{ Math.floor(loadedRatio * 100) }}%
            </div>
            <pdf-viewer
              ref="pdf"
              style="border: 1px solid red"
              :src="`https://api.jafung.test/api/dokumen/pdf/${idDokumen}`"
              :page="page"
              :rotate="rotate"
              @progress="loadedRatio = $event"
              @num-pages="numPages = $event"
              @link-clicked="page = $event"
            ></pdf-viewer>
          </div>
          <div class="column">
            <b-card>
              <form @submit.prevent="submit">
                <b-field>
                  <b-radio-button
                    v-model="formData.status"
                    native-value="tms"
                    type="is-danger is-light is-outlined"
                  >
                    <b-icon icon="close"></b-icon>
                    <span>Tidak Memenuhi Syarat</span>
                  </b-radio-button>

                  <b-radio-button
                    v-model="formData.status"
                    native-value="ms"
                    type="is-success is-light is-outlined"
                  >
                    <b-icon icon="check"></b-icon>
                    <span>Memenuhi Syarat</span>
                  </b-radio-button>
                </b-field>
                <div v-if="formData.status === 'tms'">
                  <b-field label="Keterangan TMS">
                    <b-input
                      v-model="formData.keterangan"
                      maxlength="200"
                      type="textarea"
                    ></b-input>
                  </b-field>
                </div>
                <b-field
                  ><!-- Label left empty for spacing -->
                  <p class="control">
                    <b-button
                      type="is-primary"
                      :loading="isLoading"
                      native-type="submit"
                      label="Simpan Verifikasi"
                    >
                    </b-button>
                  </p>
                </b-field>
              </form>
            </b-card>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
      </footer>
    </div>
  </div>
</template>
<script>
import pdfViewer from 'vue-pdf'

export default {
  components: {
    pdfViewer,
  },
  props: {
    idDokumen: {
      type: Number,
      default: 0,
    },
    idPengajuan: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      numPages: 0,
      page: 1,
      loadedRatio: 0,
      rotate: 0,
      disabled_plus: false,
      disabled_min: true,
      formData: {
        status: 'tms',
        keterangan: '',
        id_pengajuan: this.idPengajuan,
        id_dokumen: this.idDokumen,
      },
      isLoading: false,
    }
  },
  watch: {
    page(val) {
      if (val === this.numPages) {
        return (this.disabled_plus = true)
      } else if (val === 1) {
        return (this.disabled_min = true)
      } else {
        this.disabled_min = false
        this.disabled_plus = false
      }
    },
    'formData.status'(val) {
      if (val === 'ms') {
        this.formData.keterangan = ''
      }
    },
  },
  mounted() {
    const CurrentRole = this.$auth.user.role.nama.toLowerCase()
    if (CurrentRole !== 'user' || CurrentRole !== 'admin_skpd') {
      this.fetchVerifikasi()
    }
  },
  methods: {
    fetchVerifikasi() {
      this.isLoading = true
      this.$axios
        .get(`/verifikasi/${this.idDokumen}`)
        .then(({ data }) => {
          this.formData.status = data.data.status
          this.formData.keterangan = data.data.keterangan
          this.isLoading = false
        })
        .catch((err) => {
          this.$buefy.toast.open({
            message: `Error: ${err.response.data.message}`,
            type: 'is-danger',
            queue: false,
          })
          this.isLoading = false
        })
    },
    submit() {
      this.isLoading = true
      this.$axios
        .post('/verifikasi', this.formData)
        .then((resp) => {
          if (resp.data.success) {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Success: ${resp.data.message}`,
              type: 'success',
              queue: false,
            })
            this.isLoading = false
            this.$parent.close()
          }
        })
        .catch((err) => {
          this.isLoading = false
          if (err.response.status === 422) {
            this.$buefy.toast.open({
              message: `Error: ${err.response.data.keterangan}`,
              type: 'is-danger',
              queue: false,
            })
          }
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
