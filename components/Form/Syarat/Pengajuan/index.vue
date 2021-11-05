<template>
  <form @submit.prevent="simpan">
    <b-field label="Nomor Urut">
      <b-numberinput
        min="1"
        v-model="formData.urutan"
        controls-position="compact"
      ></b-numberinput>
    </b-field>
    <b-field label="Nama">
      <b-input v-model="formData.nama" :loading="isLoading"></b-input>
    </b-field>
    <b-field label="Upload Dokumen">
      <b-switch v-model="formData.is_upload">
        <template v-if="formData.is_upload">
          Dokumen di upload saat pengisian form
        </template>
        <template v-else> Dokumen akan di ambil dari SIM-ASN </template>
      </b-switch>
    </b-field>
    <template v-if="!formData.is_upload">
      <b-field label="Pilih Jenis Dokumen Dari SIM_ASN">
        <b-select placeholder="Pilih Dokumen" v-model="formData.simpeg_dokumen">
          <option v-for="option in data" :value="option" :key="option">
            {{ option.toUpperCase() }}
          </option>
        </b-select>
      </b-field>
    </template>
    <b-field>
      <b-button native-type="submit" label="simpan"> </b-button>
    </b-field>
  </form>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      isLoading: false,
      data: [
        'sk_pns',
        'sk_pemberhentian',
        'sk_jabatan',
        'sk_golongan',
        'sk_diklat',
        'ijazah',
        'buku_nikah',
        'akta_cerai',
        'akta_kelahiran',
        'surat_kematian',
        'surat_adopsi_anak',
      ],
      formData: {
        id: null,
        urutan: null,
        nama: null,
        is_upload: true,
        simpeg_dokumen: null,
      },
    }
  },
  watch: {
    'formData.is_upload'(newValue) {
      if (newValue === true) {
        this.formData.simpeg_dokumen = null
      } else {
        this.formData.simpeg_dokumen = this.formData.simpeg_dokumen
      }
    },
    form(newValue) {
      this.isLoading = true
      if (newValue) {
        this.formData = newValue
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      }
    },
  },
  methods: {
    simpan() {
      this.isLoading = true
      if (this.formData.id === null) {
        this.$axios
          .post('/syarat_pengajuan', this.formData)
          .then((resp) => {
            if (resp.data.success) {
              this.isLoading = false
              this.$buefy.toast.open({
                message: `Success: ${resp.data.message}`,
                type: 'is-success',
                queue: false,
              })
            }
            this.$router.push('/syarat/pengajuan/table')
          })
          .catch((err) => {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Error: ${Object.values(err.response.data)}`,
              type: 'is-danger',
              queue: false,
            })
          })
      } else {
        this.$axios
          .patch('/syarat_pengajuan', this.formData)
          .then((resp) => {
            if (resp.data.success) {
              this.isLoading = false
              this.$buefy.toast.open({
                message: `Success: ${resp.data.message}`,
                type: 'is-success',
                queue: false,
              })
            }
            this.$router.push('/syarat/pengajuan/table')
          })
          .catch((err) => {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Error: ${Object.values(err.response.data)}`,
              type: 'is-danger',
              queue: false,
            })
          })
      }
    },
  },
}
</script>