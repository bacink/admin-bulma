<template>
  <div>
    <b-card title="Syarat Pengajuan">
      <form @submit.prevent="addSyaratJafung">
        <b-field label="Nomor Urut">
          <b-numberinput v-model="urutan" min="0" max="10"> </b-numberinput>
          <p class="control">
            <select-syarat-pengajuan
              v-model="idSyaratPengajuan"
            ></select-syarat-pengajuan>
          </p>
          <p class="control">
            <b-button
              native-type="submit"
              class="button is-primary"
              :loading="loading"
              >+</b-button
            >
          </p>
        </b-field>
      </form>
      <hr />
      <template v-if="data.length > 0 && $route.params.id">
        <draggable
          v-model="myList"
          :disabled="!enabled"
          class="list-group"
          ghost-class="ghost"
          @start="dragging = true"
          @end="dragging = false"
        >
          <div v-for="item in myList" :key="item.id">
            <div class="card">
              <div class="card-content">
                <div class="content">{{ item.urutan }}. {{ item.nama }}</div>
              </div>
            </div>
          </div>
        </draggable>
        <div class="buttons">
          <b-button type="is-primary" expanded @click="simpanUrutan"
            >Simpan Urutan</b-button
          >
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import SelectSyaratPengajuan from '@/components/SelectOption/SyaratPengajuan'

export default {
  components: {
    draggable,
    SelectSyaratPengajuan,
  },
  data() {
    return {
      idJenisJafung: this.$route.params.id,
      urutan: 1,
      idSyaratPengajuan: 0,
      data: [],
      dragging: false,
      enabled: true,
      loading: false,
    }
  },
  computed: {
    myList: {
      get() {
        return this.data
      },
      set(value) {
        this.data = value
      },
    },
  },
  watch: {
    data(newValue) {
      if (newValue) {
        return (this.urutan = this.data.length + 1)
      }
    },
  },
  created() {
    this.getSyaratJafung()
  },
  methods: {
    getSyaratJafung() {
      this.loading = true
      this.$axios
        .$get(`syarat_jafung/${this.idJenisJafung}`)
        .then((response) => {
          this.data = response.data
          const result = response.data.map((item) => {
            return {
              id: item.id,
              id_syarat_pengajuan: item.syarat_pengajuan.id,
              id_jenis_jafung: item.jenis_jafung.id,
              urutan: item.urutan,
              nama: item.syarat_pengajuan.nama,
            }
          })

          this.data = result
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.loading = false
        })
    },
    addSyaratJafung() {
      this.$axios
        .$post(`syarat_jafung`, {
          urutan: this.urutan,
          id_jenis_jafung: this.idJenisJafung,
          id_syarat_pengajuan: this.idSyaratPengajuan,
        })
        .then((response) => {
          this.data = response.data
          this.$buefy.toast.open({
            message: 'Berhasil disimpan',
            type: 'is-success',
          })
          this.getSyaratJafung()
        })
        .catch((err) => {
          throw err
        })
    },
    simpanUrutan() {
      this.loading = true
      this.$axios
        .$post(`syarat_jafung/urutan`, {
          data: this.data,
        })
        .then((response) => {
          this.getSyaratJafung()
          this.$buefy.toast.open({
            message: 'Berhasil diurutkan',
            type: 'is-success',
          })
        })
        .catch((err) => {
          throw err
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
