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
          .$get('/template/surat/')
          .then((r) => {
            r.data.length ? (this.form = r.data[0].mengingat) : (this.form = [])
          })
          .catch((e) => {
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
        return alert('kosong')
      }
      this.isLoading = true
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
              type: 'success',
              queue: false,
            })
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
  head() {
    return {
      title: 'TEMPLATE SURAT',
    }
  },
}
</script>
