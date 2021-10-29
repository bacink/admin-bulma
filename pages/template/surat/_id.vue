<template>
  <div>
    <hero-bar>
      {{ heroTitle }}
      <nuxt-link slot="right" :to="heroRouterLinkTo" class="button">
        {{ heroRouterLinkLabel }}
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <b-card
          :title="formCardTitle"
          icon="account-edit"
          class="tile is-child"
        >
          <form-template-surat
            :form="form"
            :kop-dpn="kopDpn"
            :kop-blk="kopBlk"
            :id-jenis-jafung="idJenisJafung"
            :jenis-jafung="jenisJafung"
            @clicked="onClickChild"
          ></form-template-surat
        ></b-card>
      </tiles>
    </section>
  </div>
</template>
<script>
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import FormTemplateSurat from '@/components/Form/Template/Surat'
export default {
  components: {
    Tiles,
    HeroBar,
    FormTemplateSurat,
  },
  data() {
    return {
      form: [],
      kopDpn: '',
      kopBlk: '',
      idJenisJafung: 0,
      jenisJafung: '',
      isProfileExists: false,
    }
  },
  computed: {
    heroTitle() {
      if (this.isProfileExists) {
        return 'FORM EDIT TEMPLATE SURAT'
      } else {
        return 'FORM INPUT TEMPLATE SURAT'
      }
    },
    heroRouterLinkTo() {
      if (this.isProfileExists) {
        return '/template/surat/'
      } else {
        return '/template/surat/table'
      }
    },
    heroRouterLinkLabel() {
      if (this.isProfileExists) {
        return 'New template surat'
      } else {
        return 'Data template surat'
      }
    },
    formCardTitle() {
      if (this.isProfileExists) {
        return 'Edit Template Surat'
      } else {
        return 'New Template Surat'
      }
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.$route.params.id) {
        this.$axios
          .$get(`/template/surat/${this.$route.params.id}`)
          .then((r) => {
            this.form = r.data.mengingat
            this.kopDpn = r.data.kop_depan
            this.kopBlk = r.data.kop_belakang
            this.idJenisJafung = r.data.id_jenis_jafung
            this.jenisJafung = r.data.jenis_jafung.nama
            this.isProfileExists = true
          })
          .catch((e) => {
            this.form = []

            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false,
            })
          })
      }
    },
    onClickChild(mengingat, idJenisJafung, KopDpn, KopBlk) {
      if (mengingat.length === 0) {
        this.$buefy.toast.open({
          message: `Error: Field Mengingat tidak boleh kosong`,
          type: 'is-danger',
          queue: false,
        })
      }
      this.isLoading = true

      if (this.isProfileExists) {
        this.updateData(mengingat, idJenisJafung, KopDpn, KopBlk)
      } else {
        this.saveData(mengingat, idJenisJafung, KopDpn, KopBlk)
      }
    },
    saveData(mengingat, idJenisJafung, KopDpn, KopBlk) {
      this.$axios
        .$post('/template/surat', {
          kop_depan: KopDpn,
          kop_belakang: KopBlk,
          id_jenis_jafung: idJenisJafung,
          mengingat,
        })
        .then((resp) => {
          if (resp.success) {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Success: ${resp.message}`,
              type: 'is-success',
              queue: false,
            })
          }
          this.$router.push({ name: 'template-surat-table' })
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
    updateData(mengingat, idJenisJafung, KopDpn, KopBlk) {
      this.$axios
        .$patch('/template/surat', {
          id: this.$route.params.id,
          kop_depan: KopDpn,
          kop_belakang: KopBlk,
          id_jenis_jafung: idJenisJafung,
          mengingat,
        })
        .then((resp) => {
          if (resp.success) {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Success: ${resp.message}`,
              type: 'is-success',
              queue: false,
            })
          }
          this.$router.push({ name: 'template-surat-table' })
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
  head() {
    return {
      title: 'TEMPLATE SURAT',
    }
  },
}
</script>
