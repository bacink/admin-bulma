<template>
  <section>
    <form name="formData" @submit.prevent="submit">
      <div class="columns is-desktop">
        <div class="column">
          <b-field label="Cari Pegawai">
            <AcPegawai
              v-model="formData.pegawai"
              :required="true"
              @input="getJabatan"
            />
          </b-field>

          <div v-if="animated">
            <b-skeleton :animated="animated"></b-skeleton>
            <b-skeleton width="20%" :animated="animated"></b-skeleton>
            <b-skeleton width="40%" :animated="animated"></b-skeleton>
            <b-skeleton width="80%" :animated="animated"></b-skeleton>
          </div>
          <div v-if="formData.jabatan_lama">
            <b-field label="NIP">
              <b-input
                v-model="formData.nip"
                custom-class="is-static"
                readonly
              />
            </b-field>
            <b-field label="SKPD Aktif">
              <b-input
                v-model="formData.karir_lama.skpd"
                custom-class="is-static"
                readonly
              />
            </b-field>
            <b-field label="Unit Kerja Aktif">
              <b-input
                v-model="formData.karir_lama.unit_kerja"
                custom-class="is-static"
                readonly
              />
            </b-field>
            <b-field label="Jabatan Aktif">
              <b-input
                v-model="formData.karir_lama.jabatan"
                custom-class="is-static"
                readonly
              />
            </b-field>
            <b-field label="Golongan Aktif">
              <b-input
                v-model="formData.karir_lama.golongan"
                custom-class="is-static"
                readonly
              />
            </b-field>
          </div>
        </div>
        <div class="column">
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
          <hr />
          <b-field>
            <b-button
              type="is-primary"
              :loading="isLoading"
              native-type="submit"
            >
              Submit
            </b-button>
          </b-field>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import AcPegawai from '@/components/AutoComplete/Pegawai'
import AcSkpd from '@/components/AutoComplete/Skpd'
import AcUnitKerja from '@/components/AutoComplete/UnitKerja'
import AcJabatan from '@/components/AutoComplete/Jabatan'
export default {
  components: { AcPegawai, AcSkpd, AcUnitKerja, AcJabatan },
  data() {
    return {
      formData: {
        status: 'form',
        jabatan_lama: null,
        jabatan_baru: null,
        nip: '',
        pegawai: '',
        pangkat_golongan: '',
        pendidikan: '',
        karir_lama: {
          jabatan: null,
          golongan: null,
          skpd: null,
        },
        karir_baru: {
          jabatan: '',
        },
        unit_kerja_lama: {
          id: '',
          unit_kerja: '',
        },
        unit_kerja_baru: { id: '', unit_kerja: '' },
        skpd: null,
      },
      idSkpd: null,
      idUnitKerja: null,
      animated: false,
      isLoading: false,
    }
  },
  watch: {
    'formData.skpd'() {
      this.formData.unit_kerja = null
    },
    'formData.unit_kerja'() {
      this.formData.karir_baru.jabatan = null
    },
  },
  methods: {
    getJabatanBaru(payload, payload2) {
      if (payload2) {
        this.formData.jabatan_baru = payload2
      }
    },
    getSkpd(payload, payload2) {
      if (payload2) {
        this.idSkpd = payload2.id
      }
    },
    getUnitKerja(payload, payload2) {
      if (payload2) {
        this.idUnitKerja = payload2.id
        this.formData.unit_kerja_baru = payload2.nama
      }
    },
    getJabatan(payload, payload2) {
      if (payload2 != null) {
        this.formData.id_pegawai = payload2.id
        this.formData.nip = payload2.nip
        this.getJabatanAktif(payload2.id)
        this.getGolonganAktif(payload2.id)
      }
    },
    getJabatanAktif(id) {
      this.animated = true
      this.$axios
        .$get('/jabatan/aktif/' + id)
        .then((resp) => {
          if (resp.success) {
            this.animated = false
            const data = resp.data
            this.formData.jabatan_lama = data
            this.formData.karir_lama.jabatan = data.jabatan.nama
            this.formData.karir_lama.unit_kerja =
              data.jabatan.unit_kerja.nama_lengkap
            this.formData.karir_lama.skpd = data.jabatan.skpd.nama
          }
        })
        .catch((err) => {
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false,
          })
        })
    },
    getGolonganAktif(id) {
      this.$axios
        .$get('/golongan/' + id)
        .then((resp) => {
          if (resp.success) {
            const data = resp.data
            this.formData.karir_lama.golongan = data.referensi.golongan
          }
        })
        .catch((err) => {
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false,
          })
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
              type: 'success',
              queue: false,
            })
            const idPengajuan = resp.data.id
            this.$router.push(`/pengajuan/${idPengajuan}`)
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
