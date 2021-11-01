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
        <card-component
          :title="formCardTitle"
          icon="account-edit"
          class="tile is-child"
        >
          <div class="block"></div>
          <form @submit.prevent="submit">
            <b-field label="ID" horizontal>
              <b-input v-model="form.id" custom-class="is-static" readonly />
            </b-field>
            <hr />
            <b-field label="Kode" horizontal>
              <b-input
                v-model="form.kode"
                placeholder="Contoh: ppk"
                required
                maxlength="10"
                minlength="3"
              />
            </b-field>
            <b-field label="Nama" horizontal>
              <b-input
                v-model="form.nama"
                placeholder="Contoh: Pengangkatan pertama kali"
                required
                maxlength="200"
                minlength="5"
                type="textarea"
              />
            </b-field>
            <hr />
            <b-field horizontal>
              <b-button
                type="is-primary"
                :loading="isLoading"
                native-type="submit"
              >
                Submit
              </b-button>
            </b-field>
          </form>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import find from 'lodash/find'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'JenisJafungForm',
  components: {
    CardComponent,
    Tiles,
    HeroBar,
  },
  data() {
    return {
      isError: false,
      error: [],
      id: null,
      isLoading: false,
      form: this.getClearFormObject(),
      createdReadable: null,
      isProfileExists: false,
    }
  },
  computed: {
    heroTitle() {
      if (this.isProfileExists) {
        return 'FORM EDIT JENIS JAFUNG'
      } else {
        return 'FORM INPUT JENIS JAFUNG'
      }
    },

    heroRouterLinkTo() {
      if (this.isProfileExists) {
        return '/jenis/jafung/'
      } else {
        return '/jenis/jafung/table'
      }
    },
    heroRouterLinkLabel() {
      if (this.isProfileExists) {
        return 'New Jenis Jafung'
      } else {
        return 'Data Jenis Jafung'
      }
    },
    formCardTitle() {
      if (this.isProfileExists) {
        return 'Edit Jenis Jafung'
      } else {
        return 'New Jenis Jafung'
      }
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getClearFormObject() {
      return {
        id: null,
        nama: null,
        created_date: new Date(),
        created_mm_dd_yyyy: null,
      }
    },
    getData() {
      if (this.$route.params.id) {
        this.$axios
          .$get('/jenis_jafung/')
          .then((r) => {
            const item = find(
              r.data,
              (item) => item.id === parseInt(this.$route.params.id)
            )

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_at)
              this.createdReadable = dayjs(new Date(item.created_at)).format(
                'MMM D, YYYY'
              )
            } else {
              this.$router.push({ name: 'jenis-jafung-id' })
            }
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
    input(v) {
      this.createdReadable = dayjs(v).format('MMM D, YYYY')
    },
    submit() {
      this.isLoading = true
      this.$axios
        .$post('/jenis_jafung/', this.form)
        .then((resp) => {
          setTimeout(() => {
            this.isLoading = false
            this.$buefy.snackbar.open({
              message: `${resp.message}`,
              queue: false,
            })
          }, 500)
          this.$router.push({ name: 'jenis-jafung-table' })
        })
        .catch((e) => {
          this.isLoading = false
          const error = e.response.data
          this.$buefy.toast.open({
            message: `Error: ${Object.values(error)}`,
            type: 'is-danger',
            queue: false,
          })
        })
    },
  },
  head() {
    return {
      title: 'Jenis Jafung',
    }
  },
}
</script>
