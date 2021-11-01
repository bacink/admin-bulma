<template>
  <section>
    <div class="columns is-multiline is-desktop">
      <div class="column">
        <b-card title="Draft Surat Keputusan">
          <div v-if="kode === 'ppk'">
            <draft-ppk
              :mengingat="mengingat"
              :pengajuan="pengajuan"
              :kepala-skpd="kepalaSkpd"
              :surat-pengantar="suratPengantar"
              :penandatangan="penandatangan"
              :kop-depan="kopDepan"
              :kop-belakang="kopBelakang"
            ></draft-ppk>
          </div>
          <div v-if="kode === 'kjf'">
            <draft-kjf
              :mengingat="mengingat"
              :pengajuan="pengajuan"
              :kepala-skpd="kepalaSkpd"
              :surat-pengantar="suratPengantar"
              :penandatangan="penandatangan"
              :kop-depan="kopDepan"
              :kop-belakang="kopBelakang"
            ></draft-kjf>
          </div>
        </b-card>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      kode: null,
      mengingat: [],
      pengajuan: {},
      kepalaSkpd: null,
      suratPengantar: {},
      penandatangan: {
        nama: null,
        nip: null,
        pangkat: null,
      },
      kopDepan: null,
      kopBelakang: null,
    }
  },
  watch: {
    kode(newValue) {
      switch (newValue) {
        case 'ppk':
          this.getKepalaBkpsdm()
          break
        case 'kjf':
          this.getKepalaBkpsdm()
          break
        default:
          this.getBupati()
      }
    },
  },
  mounted() {
    this.getPengajuan()
  },
  methods: {
    getKepalaBkpsdm() {
      this.isLoading = true
      this.$axios
        .$get(`/kepala/bkpsdm`)
        .then(({ data }) => {
          this.penandatangan.nama = data.pegawai.nama_lengkap
          this.penandatangan.nip = data.pegawai.nip
          this.penandatangan.pangkat = data.golongan.referensi.pangkat
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    getBupati() {
      this.isLoading = true
      this.$axios
        .$get(`/bupati`)
        .then(({ data }) => {})
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    getTemplateSurat(id) {
      this.isLoading = true
      this.$axios
        .$get(`/template/surat/pengajuan/${id}`)
        .then(({ data }) => {
          this.kode = data.jenis_jafung.kode
          this.mengingat = data.mengingat
          this.kopDepan = data.kop_depan
          this.kopBelakang = data.kop_belakang
        })
        .catch((error) => {
          this.$route.push({ name: 'pengajuan-table' })
          throw error
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    getPengajuan() {
      this.$axios
        .$get(`/pengajuan/${this.$route.params.id}`)
        .then(({ data }) => {
          this.pengajuan = data
          this.kepalaSkpd = `${data.jabatan_lama.jabatan_sotk.skpd.jabatan_kepala.nama} ${data.jabatan_lama.jabatan_sotk.skpd.jabatan_kepala.spesifikasi}`
          this.suratPengantar = data.surat_pengantar

          this.getTemplateSurat(data.jenis_jafung.id)
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>
