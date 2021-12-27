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
            <td>{{ item.syarat_pengajuan.nama }}</td>
            <td>
              <span v-if="item.syarat_pengajuan.is_upload === 'false'">
                <BtnDokumenSimpeg
                  :id-pegawai="idPegawai"
                  :simpeg-dokumen="item.simpeg_dokumen"
                />
              </span>
              <span v-else>
                <BtnDokumen
                  :key="componentKey"
                  :id-syarat-pengajuan="item.syarat_pengajuan.id"
                  :id-pengajuan="idPengajuan"
                />
              </span>
            </td>
            <td>
              <span v-if="item.syarat_pengajuan.is_upload === 'true'">
                <center>
                  <b-button
                    icon-left="upload"
                    label="Upload"
                    type="is-info"
                    @click="cardModal(item.syarat_pengajuan.id)"
                  />
                </center>
              </span>
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
      <b-loading
        v-model="isLoading"
        :is-full-page="isFullPage"
        :can-cancel="true"
      ></b-loading>
    </div>
  </section>
</template>
<script>
import ModalForm from '@/components/Modal/FormUpload.vue'
import BtnDokumen from '@/components/Form/Pengajuan/BtnDokumen'
import BtnDokumenSimpeg from '@/components/Form/Pengajuan/BtnDokumenSimpeg'

export default {
  components: {
    BtnDokumen,
    BtnDokumenSimpeg,
  },
  props: {
    idPegawai: {
      type: String,
      default: null,
    },
    jenisJafungId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      componentKey: 0,
      isLoading: false,
      syaratPengajuan: null,
      idPengajuan: parseInt(this.$route.params.id),
      isComponentModalActive: false,
      isFullPage: true,
    }
  },
  computed: {},
  mounted() {
    this.fetchSyaratPengajuan(this.jenisJafungId)
  },
  methods: {
    forceRerender() {
      this.componentKey += 1
    },
    cardModal(x) {
      const modal = this.$buefy.modal.open({
        parent: this,
        component: ModalForm,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        props: {
          idSyaratPengajuan: x,
          idPengajuan: this.idPengajuan,
        },
      })
      modal.$on('close', () => {
        this.fetchSyaratPengajuan(this.jenisJafungId)
        this.forceRerender()
      })
    },

    fetchSyaratPengajuan(id) {
      this.isLoading = true
      this.$axios.$get(`/syarat_jafung/${id}`).then((resp) => {
        if (resp) {
          this.isLoading = false
          const data = resp.data
          this.syaratPengajuan = data
        }
      })
    },
    updateStatus(idPengajuan, Status) {
      this.isLoading = true
      this.$axios
        .patch('/pengajuan/update/status', {
          id_pengajuan: idPengajuan,
          status: Status,
        })
        .then((resp) => {
          if (resp.data.success) {
            this.$buefy.toast.open({
              message: `Success: ${resp.data.message}`,
              type: 'is-success',
              queue: false,
            })
            this.$router.push(`/pengajuan/table`)
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
    submit() {
      this.isLoading = true
      this.$axios
        .post('/pengajuan/form_step', {
          id_pengajuan: this.idPengajuan,
          status: 'diajukan',
        })
        .then((resp) => {
          if (resp.data.success) {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Success: ${resp.data.message}`,
              type: 'is-success',
              queue: false,
            })
            this.updateStatus(this.idPengajuan, 'diajukan')
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
