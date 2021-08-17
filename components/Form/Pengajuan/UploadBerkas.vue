<template>
  <section>
    <div class="content">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Persyaratan Pengajuan</th>
            <th>File</th>
            <th>
              <center>Opsi</center>
            </th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in syaratPengajuan" :key="index">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.nama }}</td>
            <td>
              <div v-if="dokumenPengajuan">
                <div v-for="(dokumen, inde) in dokumenPengajuan" :key="inde">
                  <div v-if="dokumen.id_syarat_pengajuan === item.id">
                    <b-button
                      icon-left="pdf-box"
                      type="is-danger"
                      @click="pdfModal(dokumen.id)"
                    >
                      View
                    </b-button>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <center>
                <b-button
                  icon-left="upload"
                  label="Upload"
                  type="is-info"
                  @click="cardModal(item.id)"
                />
              </center>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <section>
        <form @submit.prevent="submit">
          <b-field>
            <b-button
              type="is-primary"
              :loading="isLoading"
              native-type="submit"
            >
              Selesai
            </b-button>
          </b-field>
        </form>
      </section>
    </div>
  </section>
</template>
<script>
import ModalForm from '@/components/Modal/FormUpload.vue'
import ModalPdf from '@/components/Modal/FilePdf.vue'

export default {
  data() {
    return {
      isLoading: false,
      syaratPengajuan: null,
      dokumenPengajuan: null,
      idPengajuan: this.$route.params.id,
      isComponentModalActive: false,
    }
  },
  computed: {},
  mounted() {
    this.fetchSyaratPengajuan()
    this.fetchdokumenPengajuan()
  },
  methods: {
    cardModal(x) {
      this.$buefy.modal.open({
        parent: this,
        component: ModalForm,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        props: {
          idSyaratPengajuan: {
            type: Number,
            default: x,
          },
          idPengajuan: {
            type: Number,
            default: this.idPengajuan,
          },
        },
      })
    },
    pdfModal(x) {
      this.$buefy.modal.open({
        parent: this,
        component: ModalPdf,
        fullScreen: true,
        hasModalCard: true,
        props: {
          idDokumen: {
            type: Number,
            default: x,
          },
        },
      })
    },
    fetchSyaratPengajuan() {
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
            duration: 5000,
            message: `Something's not good, ${err}`,
            position: 'is-bottom',
            type: 'is-danger',
          })
        })
    },
    fetchdokumenPengajuan() {
      this.$axios
        .$get(`/dokumen/${this.idPengajuan}`)
        .then((resp) => {
          if (resp.success) {
            const data = resp.data
            this.dokumenPengajuan = data
          }
        })
        .catch((err) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: `Something's not good, ${err}`,
            position: 'is-bottom',
            type: 'is-danger',
          })
        })
    },
    submit() {
      this.isLoading = true
      this.$axios
        .patch('/pengajuan', {
          id_pengajuan: this.idPengajuan,
          status: 'diajukan',
        })
        .then((resp) => {
          console.log(resp)
          if (resp.data.success) {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Success: ${resp.data.message}`,
              type: 'success',
              queue: false,
            })
            this.$router.push(`/pengajuan/table`)
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
