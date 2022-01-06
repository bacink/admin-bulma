<template>
  <section>
    <form name="formData" @submit.prevent="submit">
      <div class="block">
        <b-field position="is-centered">
          <template v-if="isRoleUser">
            <b-input
              v-model="formData.pegawai.nama"
              custom-class="is-static"
              readonly
              expanded
            />
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
        <div v-if="infoPegawai" class="column box">
          <b-card title="Informasi Pegawai">
            <div v-if="animated">
              <b-skeleton :animated="animated"></b-skeleton>
              <b-skeleton width="20%" :animated="animated"></b-skeleton>
              <b-skeleton width="40%" :animated="animated"></b-skeleton>
              <b-skeleton width="80%" :animated="animated"></b-skeleton>
            </div>
            <div>
              <ul>
                <li>
                  <p>
                    <strong>Nama Pegawai :</strong>
                    <span class="has-text-right">
                      {{ formData.pegawai.nama }}</span
                    >
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Nip :</strong>
                    <span class="has-text.nama-right">
                      {{ formData.pegawai.nip }}</span
                    >
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Tempat, tanggal lahir :</strong>
                    <span class="has-text.nama-right">
                      {{ formData.pegawai.ttl }}</span
                    >
                  </p>
                </li>
                <template v-if="formData.jabatan_lama">
                  <li>
                    <p>
                      <strong>Golongan :</strong>
                      <span class="has-text-right">
                        {{ formData.pegawai.golongan }}
                      </span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Pendidikan :</strong>
                      <span class="has-text-right">
                        {{ formData.pegawai.pendidikan }}
                      </span>
                    </p>
                  </li>
                </template>
              </ul>
            </div>
          </b-card>
          <b-card title="Informasi Jabatan">
            <ul>
              <template v-if="formData.jabatan_lama">
                <li>
                  <p>
                    <strong>Jabatan :</strong>
                    <span class="has-text-right">
                      {{ formData.karir_lama.jabatan }}</span
                    >
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Skpd :</strong>
                    <span class="has-text-right">
                      {{ formData.karir_lama.skpd }}</span
                    >
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Unit Kerja :</strong>
                    <span class="has-text-right">
                      {{ formData.karir_lama.unit_kerja }}</span
                    >
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Kelas Jabatan :</strong>
                    <span class="has-text-right">
                      <b-notification
                        :type="formError.kelas_jabatan ? 'is-danger' : ''"
                        aria-close-label="Close notification"
                        role="alert"
                      >
                        {{
                          formError.kelas_jabatan
                            ? 'Perbaiki Kelas Jabatan di SOTK'
                            : formData.karir_lama.kelas_jabatan
                        }}
                      </b-notification>
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Tunjangan :</strong>
                    <span class="has-text-right">
                      <b-notification
                        :type="formError.tunjangan ? 'is-danger' : ''"
                        aria-close-label="Close notification"
                        role="alert"
                      >
                        {{
                          formError.tunjangan
                            ? 'Perbaiki Tunjangan di SOTK'
                            : formData.karir_lama.tunjangan
                        }}
                      </b-notification>
                    </span>
                  </p>
                </li>
              </template>
            </ul>
          </b-card>
        </div>

        <div v-if="infoPegawai" class="column box">
          <b-card title="Form Pengajuan">
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
              <b-field label="Unit Kerja Baru Yang dilamar">
                <AcUnitKerja
                  v-model="formData.unit_kerja"
                  :id-skpd="idSkpd"
                  :required="true"
                  @input="getUnitKerja"
                />
              </b-field>
              <b-field label="Jabatan Baru Yang dilamar">
                <AcJabatan
                  v-model="formData.karir_baru.jabatan"
                  :id-skpd="idSkpd"
                  :id-unit-kerja="idUnitKerja"
                  @input="getJabatanBaru"
                />
              </b-field>
            </div>
          </b-card>
        </div>
      </div>

      <hr />
      <b-field>
        <b-button type="is-primary" :loading="isLoading" native-type="submit">
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
import AcSkpd from '@/components/AutoComplete/Skpd'
import AcUnitKerja from '@/components/AutoComplete/UnitKerja'
import AcJabatan from '@/components/AutoComplete/Jabatan'
import AcJenisJafung from '@/components/AutoComplete/JenisJafung'
export default {
  components: { AcPegawai, AcSkpd, AcUnitKerja, AcJabatan, AcJenisJafung },
  data() {
    return {
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
    }
  },
  computed: {
    ...mapState(['role', 'user']),
  },
  watch: {
    'formData.skpd'() {
      this.formData.unit_kerja = null
    },
    'formData.unit_kerja'() {
      this.formData.karir_baru.jabatan = null
    },
  },
  created() {
    const role = this.role.toLowerCase()
    const user = this.user
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
    getJenisJafung(payload, payload2) {
      if (payload2) {
        this.formData.id_jenis_jafung = payload2.id
      }
    },
    getJabatanBaru(payload, payload2) {
      if (payload2) {
        this.formData.jabatan_baru = payload2
      }
    },
    getSkpd(payload, payload2) {
      if (payload2) {
        this.idSkpd = payload2.id
        this.formData.id_skpd = payload2.id
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
      this.$axios
        .$get('/jabatan/aktif/' + id)
        .then((resp) => {
          if (resp.success) {
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
          this.animated = false
          this.infoPegawai = false
          throw err
        })
    },
    getGolonganAktif(id) {
      this.$axios
        .$get('/golongan/' + id)
        .then((resp) => {
          if (resp.success) {
            const data = resp.data
            this.formData.karir_lama.golongan = `${data.referensi.pangkat} / ${data.referensi.golongan}`
            this.formData.pegawai.golongan = this.formData.karir_lama.golongan
          }
        })
        .catch((err) => {
          throw err
        })
    },
    getPendidikanAktif(id) {
      this.$axios
        .$get('/pendidikan/' + id)
        .then((resp) => {
          if (resp.success) {
            let tingkat = null

            if (resp.data.tingkat) {
              tingkat = resp.data.tingkat.singkatan
            }
            this.formData.pegawai.pendidikan =
              tingkat + ', ' + resp.data.jurusan
          }
        })
        .catch((err) => {
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
          this.formData = this.getClearFormObject()
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
