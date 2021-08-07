<template>
  <div class="card">
    <div class="card-content">
      <ac-pegawai v-model="cariPegawai" @get-selected="getSelected" />
      <hr />
      {{ skpd }}
      <template v-if="infoPegawai">
        <template v-if="selected">
          <template v-if="selected.jabatan_aktif">
            <div v-for="(item, index) in selected.jabatan_aktif" :key="index">
              <b-field :label="'JABATAN ' + item.jabatan.jenis.toUpperCase()">
                <b-input v-model="item.jabatan.nama" readonly />
              </b-field>
              <b-field label="UNIT KERJA">
                <b-input v-model="item.jabatan.unit_kerja.nama" readonly />
              </b-field>
              <b-field label="SKPD">
                <b-input v-model="item.jabatan.skpd.nama" readonly />
              </b-field>
            </div>
          </template>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import AcPegawai from '@/components/AutoComplete/Pegawai'
export default {
  components: { AcPegawai },
  props: {
    infoPegawai: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cariPegawai: '',
      selected: null,
      skpd: null,
    }
  },
  watch: {
    cariPegawai() {
      this.skpd = 'sedang ngetik'
    },
  },
  methods: {
    getData(e) {
      this.selected = e
    },
    getInput(e) {
      return (this.cariPegawai = e)
    },
    getSelected(e) {
      if (e != null) {
        this.selected = e
      }
    },
  },
}
</script>
