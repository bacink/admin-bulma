<template>
  <section>
    <b-field label="Pilih Jabatan Baru">
      <b-select
        v-model="jabatan"
        placeholder="Pilih Jabatan"
        expanded
        :loading="isLoading"
        @input="$emit('input', $event, jabatan)"
      >
        <template v-if="jabatans"
          ><option v-for="option in jabatans" :key="option.id" :value="option">
            {{ option.nama_lengkap }}
          </option>
        </template>
      </b-select>
    </b-field>
    <b-field v-if="withUnitKerja" label="Pilih Unit Kerja Baru">
      <b-select
        v-model="unit_kerja"
        placeholder="Pilih Unit Kerja"
        :loading="isLoading"
        expanded
        @input="changeUnitKerja"
      >
        <option v-for="option in unit_kerjas" :key="option.id" :value="option">
          {{ option.unit_kerja.nama_lengkap }}
        </option>
      </b-select></b-field
    >
  </section>
</template>

<script>
export default {
  props: {
    idSkpd: {
      type: Number,
      default: 0,
    },
    withUnitKerja: {
      type: Boolean,
      default: true,
    },
    jabatans: {
      type: Array,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      unit_kerjas: [],
      query: null,
      jabatan: null,
      unit_kerja: null,
      isLoading: true,
    }
  },

  watch: {
    jabatan(newJabatan) {
      this.loadUnitKerja(newJabatan)
    },
    jabatans(newJabatans) {
      if (newJabatans) {
        this.isLoading = false
      }
    },
  },
  methods: {
    loadUnitKerja(params) {
      this.isLoading = true
      const jabatan = params.nama
      const jenjang = params.jenjang
      this.$axios
        .$get(
          `/sotk/unit_kerja/byJabatan?id_skpd=${this.idSkpd}&jabatan=${jabatan}&jenjang=${jenjang}`
        )
        .then(({ data }) => {
          this.unit_kerjas = data
        })
        .catch((error) => {
          this.unit_kerjas = []
          throw error
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    changeUnitKerja(unitKerja) {
      this.$set(this.jabatan, 'unit_kerja', unitKerja.unit_kerja)
    },
  },
}
</script>
