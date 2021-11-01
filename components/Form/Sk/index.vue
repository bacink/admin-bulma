<template>
  <section>
    <div v-if="error">
      <div v-for="item in error.data" :key="item">
        <b-message
          title="Danger"
          type="is-danger"
          aria-close-label="Close message"
        >
          {{ item }}
        </b-message>
      </div>
    </div>
    <form name="formData" @submit.prevent="submit">
      <b-field
        grouped
        label="Nomor Surat Keputusan"
        :label-position="labelPosition"
      >
        <b-field label="" expanded>
          <b-input v-model="formData.kop_depan" required></b-input>
        </b-field>
        <b-field label="">
          <b-numberinput v-model="formData.nomor" min="1" max="1000" required>
          </b-numberinput>
        </b-field>
        <b-field label="" expanded>
          <b-input v-model="formData.kop_belakang" required></b-input>
        </b-field>
      </b-field>
      <b-field grouped>
        <b-field label="Tanggal TMT" :label-position="labelPosition">
          <b-datepicker
            v-model="tmt"
            locale="id-ID"
            placeholder="Click to select..."
            icon="calendar-today"
            trap-focus
            required
          >
          </b-datepicker>
        </b-field>
        <b-field label="Tanggal Penetapan" :label-position="labelPosition">
          <b-datepicker
            v-model="tanggal_penetapan"
            locale="id-ID"
            placeholder="Click to select..."
            icon="calendar-today"
            trap-focus
            required
          >
          </b-datepicker>
        </b-field>
      </b-field>

      <b-field grouped>
        <b-field label="Angka Kredit">
          <b-numberinput
            v-model="formData.angka_kredit"
            step="000.001"
            aria-minus-label="Decrement by 0.01"
            aria-plus-label="Increment by 0.01"
            required
          >
          </b-numberinput>
        </b-field>
        <b-field label="tunjangan">
          <currency-input v-model="formData.tunjangan" :options="options" />
        </b-field>
      </b-field>
      <b-field grouped>
        <b-field>
          <b-button
            type="is-black"
            label="batal"
            icon-left="chevron-left-circle"
            @click="$router.go(-1)"
          ></b-button>
        </b-field>
        <b-field>
          <b-button
            type="is-primary"
            label="simpan"
            icon-left="content-save"
            native-type="submit"
          ></b-button>
        </b-field>
        <b-field>
          <b-button
            type="is-info"
            label="print-preview"
            icon-left="printer"
            tag="a"
            target="_blank"
            :href="`${$axios.defaults.baseURL}/print-draft/${data.id_pengajuan}`"
          ></b-button> </b-field
      ></b-field>
    </form>
  </section>
</template>
<script>
import CurrencyInput from '@/components/CurrencyInput.vue'
export default {
  components: { CurrencyInput },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      options: {
        locale: 'id-ID',
        currency: 'IDR',
        currencyDisplay: 'symbol',
        valueRange: undefined,
        precision: 0,
        hideCurrencySymbolOnFocus: true,
        hideGroupingSeparatorOnFocus: true,
        hideNegligibleDecimalDigitsOnFocus: true,
        autoDecimalDigits: false,
        exportValueAsInteger: true,
        autoSign: true,
        useGrouping: true,
      },
      labelPosition: 'on-border',
      tanggal_penetapan: null,
      tmt: null,
      error: null,
      formData: {
        id_pengajuan: null,
        kop_depan: null,
        kop_belakang: null,
        nomor: null,
        tmt: null,
        tanggal_sk: null,
        isi: null,
        pegawai: null,
      },
    }
  },

  watch: {
    'data.isi'(newValue) {
      this.formData.isi = newValue
    },
    'data.pegawai'(newValue) {
      this.formData.pegawai = newValue
    },
    'data.id_pengajuan'(newValue) {
      this.formData.id_pengajuan = newValue
    },
    'data.kop_depan'(newValue) {
      this.formData.kop_depan = newValue
    },
    'data.kop_belakang'(newValue) {
      this.formData.kop_belakang = newValue
    },
    tmt(newValue) {
      const date = new Date(newValue)
      const tgl = date.getDate()
      const bulan = date.getMonth() + 1
      const tahun = date.getFullYear()
      this.formData.tmt = tahun + '-' + bulan + '-' + tgl
    },
    tanggal_penetapan(newValue) {
      const date = new Date(newValue)
      const tgl = date.getDate()
      const bulan = date.getMonth() + 1
      const tahun = date.getFullYear()
      this.formData.tanggal_sk = tahun + '-' + bulan + '-' + tgl
    },
  },
  methods: {
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
              type: 'success',
              queue: false,
            })
            this.$router.push({ name: 'pengajuan-table' })
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
    simpan() {
      this.isLoading = true

      this.$axios
        .post('/surat/keputusan', this.formData)
        .then((resp) => {
          if (resp.success) {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Success: ${resp.message}`,
              type: 'is-success',
              queue: false,
            })
            this.updateStatus(this.formData.id_pengajuan, 'cetak_sk')
          }
        })
        .catch((err) => {
          this.isLoading = false
          this.error = err.response
        })
    },
    submit() {
      this.$buefy.dialog.confirm({
        title: 'Simpan dan cetak surat keputusan?',
        message:
          'Sebelum menyimpan data Surat Keputusan, kami sarankan agar anda melihat <b>printout</b> nya terlebih dahulu',
        confirmText: 'Simpan',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: () => {
          this.simpan()
        },
      })
    },
  },
}
</script>
