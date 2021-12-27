<template>
  <div>
    <hero-bar>
      {{ heroTitle }}
      <b-button
        slot="right"
        :label="formCardTitle"
        :icon-left="icon"
        tag="router-link"
        :to="heroRouterLinkTo"
        type="is-warning"
      ></b-button>
    </hero-bar>
    <section class="section is-main-section">
      <b-card :title="formCardTitle"> <FormJenisJafung :form="form" /></b-card>
      <b-card :title="formCardTitle"> <FormSyaratJafung /></b-card>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar'
import FormJenisJafung from '@/components/Form/Jenis/Jafung'
import FormSyaratJafung from '@/components/Form/Syarat/Jafung'

export default {
  components: { HeroBar, FormJenisJafung, FormSyaratJafung },
  data() {
    return {
      isProfileExists: false,
      formCardTitle: 'Jenis Jafung',
      form: this.getClearFormObject(),
    }
  },
  computed: {
    heroTitle() {
      if (this.isProfileExists) {
        return 'Edit ' + this.formCardTitle
      } else {
        return this.formCardTitle
      }
    },
    heroRouterLinkTo() {
      if (this.isProfileExists) {
        return '/jenis/jafung/'
      } else {
        return '/jenis/jafung/table'
      }
    },
    icon() {
      if (this.isProfileExists) {
        return 'plus'
      } else {
        return 'table'
      }
    },
  },
  mounted() {},
  created() {
    this.getData()
  },
  methods: {
    getClearFormObject() {
      return {
        id: null,
        nama: null,
        kode: null,
      }
    },
    getData() {
      if (this.$route.params.id) {
        this.$axios
          .$get(`/jenis_jafung/${this.$route.params.id}`)
          .then((r) => {
            const item = r.data
            if (item) {
              this.isProfileExists = true
              this.form = item
            } else {
              this.$router.push({ name: 'users' })
            }
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
  },
  head() {
    return {
      title: this.formCardTitle,
    }
  },
}
</script>
