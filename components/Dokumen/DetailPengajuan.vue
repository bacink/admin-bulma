<template>
  <section>
    <div class="content">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Persyaratan Pengajuan</th>
            <th>Status Verifikasi</th>
            <th width="20">
              <center>Lihat Dokumen</center>
            </th>
            <th width="20">
              <center>Verifikasi</center>
            </th>
          </tr>
        </thead>

        <tbody v-for="(item, index) in syaratPengajuan" :key="item.id">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.nama }}</td>
            <td>
              <StatusVerifikasi
                :key="keyComponent"
                :id-pengajuan="`${parseInt($route.params.id)}`"
                :id-syarat-pengajuan="item.id"
              />
            </td>
            <td>
              <div v-if="item.is_upload === 'true'">
                <btn-dokumen
                  :id-pengajuan="`${parseInt($route.params.id)}`"
                  :id-syarat-pengajuan="item.id"
                ></btn-dokumen>
              </div>
              <div v-else>
                <span v-if="idPegawai !== null">
                  <btn-dokumen-simpeg
                    :id-pegawai="idPegawai"
                    :simpeg-dokumen="item.simpeg_dokumen"
                  ></btn-dokumen-simpeg>
                </span>
              </div>
            </td>
            <td>
              <div v-if="item.is_upload === 'true'">
                <b-button
                  label="Verifikasi"
                  type="is-dark"
                  size="is-small"
                  @click="prompt(idPengajuan, item.id)"
                />
              </div>
              <div v-if="item.simpeg_dokumen">
                <b-button
                  label="Verifikasi"
                  type="is-dark"
                  size="is-small"
                  @click="prompt(idPengajuan, item.id)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import BtnDokumen from '@/components/Form/Pengajuan/BtnDokumen.vue'
import BtnDokumenSimpeg from '@/components/Form/Pengajuan/BtnDokumenSimpeg.vue'
import StatusVerifikasi from '../Form/Pengajuan/StatusVerifikasi.vue'

export default {
  components: {
    BtnDokumen,
    BtnDokumenSimpeg,
    StatusVerifikasi,
  },
  data() {
    return {
      syaratPengajuan: null,
      idPegawai: null,
      idPengajuan: null,
      idSyaratPengajuan: null,
      keyComponent: 0,
      isLoading: true,
    }
  },
  created() {
    this.loadPengajuan()
  },
  mounted() {
    this.loadSyaratPengajuan()
  },
  methods: {
    forceRerender() {
      this.keyComponent += 1
    },
    prompt(idPengajuan, idSyaratPengajuan) {
      this.idPengajuan = idPengajuan
      this.idSyaratPengajuan = idSyaratPengajuan

      this.$buefy.dialog.prompt({
        message: `apakah dokumen memenuhi syarat ?`,
        inputAttrs: {
          placeholder: 'keterangan TMS',
          maxlength: 300,
        },
        type: 'is-danger',
        trapFocus: true,
        confirmText: 'Tidak Memenuhi Syarat',
        cancelText: 'Memenuhi Syarat',
        onConfirm: (value) => this.simpanVerifikasi(value),
        onCancel: (value) => this.simpanVerifikasi(value),
      })
    },
    simpanVerifikasi(value) {
      const formData = new FormData()
      formData.append('id_pengajuan', this.idPengajuan)
      formData.append('id_syarat_pengajuan', this.idSyaratPengajuan)

      if (value === 'button') {
        formData.append('status', 'ms')
        return this.simpan(formData)
      }

      formData.append('status', 'tms')
      formData.append('keterangan', value)
      this.simpan(formData)
    },
    simpan(formData) {
      this.isLoading = true
      this.$axios
        .post('/verifikasi', formData)
        .then((resp) => {
          if (resp.data.success) {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Success: ${resp.data.message}`,
              type: 'is-success',
              queue: false,
            })
            this.isLoading = false
            this.forceRerender()
          }
        })
        .catch((err) => {
          this.isLoading = false
          if (err.response.status === 422) {
            this.$buefy.toast.open({
              message: `Verifikasi belum disimpan`,
              type: 'is-danger',
              queue: false,
            })
          } else {
            this.$buefy.toast.open({
              message: `Error: ${Object.values(err.response.data)}`,
              type: 'is-danger',
              queue: false,
            })
          }
        })
    },
    loadSyaratPengajuan() {
      this.isLoading = true
      this.$axios.$get(`/syarat_pengajuan/`).then((resp) => {
        if (resp) {
          this.isLoading = false
          const data = resp.data
          this.syaratPengajuan = data
        }
      })
    },
    loadPengajuan() {
      this.isLoading = true
      this.$axios.$get(`/pengajuan/${this.$route.params.id}`).then((resp) => {
        this.idPegawai = resp.data.id_pegawai
        this.idPengajuan = resp.data.id
        this.isLoading = false
      })
    },
  },
}
</script>
