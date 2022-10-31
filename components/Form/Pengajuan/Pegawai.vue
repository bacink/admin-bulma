<template>
  <section>
    <b-message
      v-show="errorPegawai"
      title="Data pegawai tidak ditemukan"
      type="is-danger"
      has-icon
      aria-close-label="Close message"
    >
      Silahkan lengkapi terlebuh dahulu data pegawai di <b>SIM-ASN</b> Seperti:
      Jabatan, Golongan dan data pendidikan terakhir
    </b-message>
    <form name="formData" @submit.prevent="submit">
      <div class="block">
        <b-field position="is-centered">
          <template v-if="isRoleUser">
            <notif type="is-info is-light">{{ formData.pegawai.nama }}</notif>
          </template>
          <template v-else>
            <AcPegawai
              v-model="formData.pegawai.nama"
              expanded
              @input="getJabatan"
            />
          </template>
        </b-field>
      </div>
      <div class="columns">
        <div v-if="infoPegawai" class="column">
          <b-card title="Informasi Pegawai" class="has-background-primary">
            <div>
              <ul>
                <li>
                  <p>
                    <strong>Nama Pegawai :</strong>
                    <span class="has-text-right">
                      {{ formData.pegawai.nama }}</span
                    >
                    <b-skeleton size="is-large" :active="animated"></b-skeleton>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Nip :</strong>
                    <span class="has-text.nama-right">
                      {{ formData.pegawai.nip }}</span
                    >
                    <b-skeleton size="is-large" :active="animated"></b-skeleton>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Tempat, tanggal lahir :</strong>
                    <span class="has-text.nama-right">
                      {{ formData.pegawai.ttl }}</span
                    >
                    <b-skeleton size="is-large" :active="animated"></b-skeleton>
                  </p>
                </li>
                <template v-if="formData.jabatan_lama">
                  <li>
                    <p>
                      <strong>Golongan :</strong>
                      <span class="has-text-right">
                        {{ formData.pegawai.golongan }}
                      </span>
                      <b-skeleton
                        size="is-large"
                        :active="animated"
                      ></b-skeleton>
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Pendidikan :</strong>
                      <span class="has-text-right">
                        {{ formData.pegawai.pendidikan }}
                      </span>
                      <b-skeleton
                        size="is-large"
                        :active="animated"
                      ></b-skeleton>
                    </p>
                  </li>
                </template>
              </ul>
            </div>
          </b-card>
          <b-card title="Informasi Jabatan" class="has-background-primary">
            <ul>
              <template v-if="formData.jabatan_lama">
                <li>
                  <p>
                    <strong>Jabatan :</strong>
                    <span class="has-text-right">
                      {{ formData.karir_lama.jabatan }}</span
                    >
                    <b-skeleton size="is-large" :active="animated"></b-skeleton>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Skpd :</strong>
                    <span class="has-text-right">
                      {{ formData.karir_lama.skpd }}</span
                    >
                    <b-skeleton size="is-large" :active="animated"></b-skeleton>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Unit Kerja :</strong>
                    <span class="has-text-right">
                      {{ formData.karir_lama.unit_kerja }}</span
                    >
                    <b-skeleton size="is-large" :active="animated"></b-skeleton>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Kelas Jabatan :</strong>
                    <span class="has-text-right">
                      <template v-if="formError.kelas_jabatan">
                        <b-notification
                          type="is-danger"
                          aria-close-label="Close notification"
                          role="alert"
                        >
                          Perbaiki Kelas Jabatan di SOTK
                        </b-notification>
                      </template>
                      <template v-else>
                        <b-input
                          v-model="formData.karir_lama.kelas_jabatan"
                        ></b-input>
                      </template>
                      <b-skeleton
                        size="is-large"
                        :active="animated"
                      ></b-skeleton>
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Tunjangan :</strong>
                    <span class="has-text-right">
                      <template v-if="formError.tunjangan">
                        <b-notification
                          type="is-danger"
                          aria-close-label="Close notification"
                          role="alert"
                        >
                          Perbaiki Tunjangan di SOTK
                        </b-notification>
                      </template>
                      <template v-else>
                        <b-input
                          v-model="formData.karir_lama.tunjangan"
                        ></b-input>
                      </template>
                      <b-skeleton
                        size="is-large"
                        :active="animated"
                      ></b-skeleton>
                    </span>
                  </p>
                </li>
              </template>
            </ul>
          </b-card>
        </div>
        <div v-if="infoPegawai" class="column">
          <b-card title="Form Pengajuan" class="has-background-primary">
            <div>
              <b-field label="Jenis Pengajuan">
                <AcJenisJafung
                  v-model="formData.jenis_jafung"
                  @input="getJenisJafung"
                />
              </b-field>
              <b-field label="SKPD Baru Yang dilamar">
                <AcSkpd v-model="formData.skpd" @input="getSkpd" />
              </b-field>
              <SelectOptionJabatan
                v-if="idSkpd"
                v-model="formData.karir_baru.jabatan"
                :jabatans="jabatans"
                :id-skpd="idSkpd"
              />
            </div>
          </b-card>
        </div>
      </div>
      <hr />
      <b-field>
        <b-button
          v-show="!errorPegawai"
          type="is-primary"
          :loading="isLoading"
          native-type="submit"
        >
          Lanjut
        </b-button>
      </b-field>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import AcPegawai from '@/components/AutoComplete/Pegawai'
// import SelectUnitKerja from '@/components/SelectOption/UnitKerja'
import AcSkpd from '@/components/AutoComplete/Skpd'
// import AcJabatan from '@/components/AutoComplete/Jabatan'
import SelectOptionJabatan from '@/components/SelectOption/Jabatan'
import AcJenisJafung from '@/components/AutoComplete/JenisJafung'
import Notif from '@/components/Notif'
export default {
  components: {
    AcPegawai,
    AcSkpd,
    SelectOptionJabatan,
    AcJenisJafung,
    Notif,
  },
  data() {
    return {
      errorPegawai: false,
      formError: {
        kelas_jabatan: false,
        tunjangan: false,
        golongan: false,
      },
      isRoleUser: false,
      formData: this.getClearFormObject(),
      idSkpd: null,
      idUnitKerja: null,
      animated: false,
      infoPegawai: false,
      isLoading: false,
      componentKey: null,
      jabatans: null,
    }
  },
  computed: {
    ...mapState(['role', 'auth']),
  },
  watch: {
    'formData.skpd'() {
      this.formData.unit_kerja = null
    },
    'formData.karir_baru.jabatan'(newValue) {
      this.formData.jabatan_baru = newValue
    },
  },
  mounted() {
    const role = this.role.toLowerCase()
    const user = this.auth.user
    if (role === 'user') {
      this.isRoleUser = true
    }
    if (this.isRoleUser) {
      this.formData.id_pegawai = user.pegawai.id
      this.formData.pegawai.id = user.pegawai.id
      this.formData.pegawai.nip = user.pegawai.nip
      this.formData.pegawai.nama = user.pegawai.nama_lengkap
      this.getJabatanAktif(user.pegawai.id)
      this.getGolonganAktif(user.pegawai.id)
    }
  },
  methods: {
    getClearFormObject() {
      return {
        status: 'form',
        id_jenis_jafung: null,
        id_pegawai: null,
        id_skpd: null,
        skpd: null,
        jabatan_lama: null,
        jabatan_baru: null,

        pegawai: {
          id: null,
          nip: null,
          nama: null,
          ttl: null,
          tempat_lahir: null,
          tanggal_lahir: null,
          golongan: null,
          pendidikan: null,
          unit_kerja: null,
        },

        karir_lama: {
          jabatan: null,
          skpd: null,
          unit_kerja: null,
          golongan: null,
          kelas_jabatan: null,
          tunjangan: null,
        },

        karir_baru: {
          jabatan: '',
        },
      }
    },
    loadDataJabatan(idSkpd) {
      this.isLoading = true
      this.$axios
        .$get(`/sotk/jabatan/q?search=null&id_skpd=${idSkpd}`)
        .then(({ data }) => {
          this.jabatans = data
        })
        .catch((error) => {
          this.jabatans = []
          throw error
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    getJenisJafung(payload, payload2) {
      if (payload2) {
        this.formData.id_jenis_jafung = payload2.id
      }
    },
    getJabatanBaru(payload, payload2) {
      this.jenjang = null
      if (payload2) {
        this.formData.jabatan_baru = payload2
      }
    },
    getSkpd(payload, payload2) {
      if (payload2) {
        this.idSkpd = payload2.id
        this.formData.id_skpd = payload2.id
        this.loadDataJabatan(payload2.id)
      }
    },
    getUnitKerja(payload, payload2) {
      if (payload2) {
        this.idUnitKerja = payload2.id
      }
    },

    getJabatan(payload, payload2) {
      if (payload2 != null) {
        this.formData = this.getClearFormObject()

        this.formData.id_pegawai = payload2.id
        this.formData.pegawai.id = payload2.id
        this.formData.pegawai.nip = payload2.nip
        this.animated = true

        this.getJabatanAktif(payload2.id)
        this.getGolonganAktif(payload2.id)
        this.getPendidikanAktif(payload2.id)
      }
    },
    getJabatanAktif(id) {
      this.animated = true

      this.$axios
        .$get('/jabatan/aktif/' + id)
        .then((resp) => {
          if (resp.success) {
            this.errorPegawai = false

            this.animated = false
            this.infoPegawai = true
            const data = resp.data
            this.formData.jabatan_lama = data

            this.formData.karir_lama.jabatan = data.jabatan.nama

            this.formData.karir_lama.unit_kerja =
              data.jabatan_sotk.unit_kerja.nama

            this.formData.pegawai.unit_kerja =
              this.formData.karir_lama.unit_kerja

            this.formData.pegawai.nama = data.pegawai.nama_lengkap
            this.formData.pegawai.tanggal_lahir = data.pegawai.tanggal_lahir
            this.formData.pegawai.tempat_lahir = data.pegawai.tempat_lahir
            this.formData.pegawai.ttl =
              data.pegawai.tempat_lahir +
              ', ' +
              dayjs(new Date(data.pegawai.tanggal_lahir)).format('DD/MM/YYYY')

            this.formData.karir_lama.skpd = data.jabatan_sotk.skpd.nama

            if (data.jabatan_sotk.kelas_jabatan) {
              this.formData.karir_lama.kelas_jabatan =
                data.jabatan_sotk.kelas_jabatan.kelas
            } else {
              this.formData.karir_lama.kelas_jabatan = null
              this.formError.kelas_jabatan = true
            }
            if (data.jabatan_sotk.kelas_jabatan) {
              this.formData.karir_lama.tunjangan =
                data.jabatan_sotk.kelas_jabatan.tunjangan
            } else {
              this.formData.karir_lama.tunjangan = null
              this.formError.tunjangan = true
            }
          }
        })
        .catch((err) => {
          this.errorPegawai = true
          this.animated = false
          this.infoPegawai = false
          throw err
        })
    },
    getGolonganAktif(id) {
      this.animated = true
      this.$axios
        .$get('/golongan/' + id)
        .then((resp) => {
          this.errorPegawai = false
          if (resp.success) {
            const data = resp.data
            this.formData.karir_lama.golongan = `${data.referensi.pangkat} / ${data.referensi.golongan}`
            this.formData.pegawai.golongan = this.formData.karir_lama.golongan
          }
        })
        .catch((err) => {
          this.errorPegawai = true
          throw err
        })
    },
    getPendidikanAktif(id) {
      this.$axios
        .$get('/pendidikan/' + id)
        .then((resp) => {
          if (resp.success) {
            this.errorPegawai = false
            let tingkat = null
            if (resp.data.tingkat) {
              tingkat = resp.data.tingkat.singkatan
            }
            this.formData.pegawai.pendidikan =
              tingkat + ', ' + resp.data.jurusan
          }
        })
        .catch((err) => {
          this.errorPegawai = true
          throw err
        })
    },
    submit() {
      this.isLoading = true
      this.$axios
        .$post('/pengajuan', this.formData)
        .then((resp) => {
          if (resp.success) {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Success: ${resp.message}`,
              type: 'is-success',
              queue: false,
            })
            const idPengajuan = resp.data.id
            this.$router.push(`/pengajuan/${idPengajuan}`)
          }
        })
        .catch((err) => {
          // this.formData = this.getClearFormObject()
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
