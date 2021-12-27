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
      <tiles>
        <card-component
          :title="formCardTitle"
          icon="account-edit"
          class="tile is-child"
        >
          <form @submit.prevent="submit">
            <b-field label="ID" horizontal>
              <b-input v-model="form.id" custom-class="is-static" readonly />
            </b-field>
            <hr />

            <b-field label="Nama" message="Nama" horizontal>
              <b-input
                v-model="form.name"
                placeholder="e.g. John Doe"
                required
                maxlength="200"
                type="text"
              />
            </b-field>
            <b-field label="Role" message="Role" horizontal>
              <SelectRole v-model.number="form.id_role" />
              <input v-model="form.id_role" type="hidden" value="1" />
            </b-field>
            <b-field label="Email" message="Email" horizontal>
              <b-input
                v-model="form.email"
                placeholder="e.g. John Doe@example.com"
                required
                maxlength="200"
                type="email"
              />
            </b-field>
            <template v-if="isProfileExists">
              <b-field
                label="Current Password"
                message="Current Password"
                horizontal
              >
                <b-input
                  v-model="form.current_password"
                  placeholder="e.g. Secret"
                  required
                  maxlength="200"
                  type="password"
                />
              </b-field>
            </template>
            <b-field label="Password" message="Password" horizontal>
              <b-input
                v-model="form.password"
                placeholder="e.g. Secret"
                required
                maxlength="200"
                type="password"
              />
            </b-field>
            <b-field
              label="Password Confirmation"
              message="Password Confirmation"
              horizontal
            >
              <b-input
                v-model="form.password_confirmation"
                placeholder="e.g. Secret"
                required
                maxlength="200"
                type="password"
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
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import SelectRole from '@/components/SelectOption/Role'
export default {
  name: 'UsersForm',
  components: {
    CardComponent,
    Tiles,
    HeroBar,
    SelectRole,
  },
  data() {
    return {
      id: null,
      isLoading: false,
      formCardTitle: 'Users',
      form: this.getClearFormObject(),
      createdReadable: null,
      isProfileExists: false,
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
        return '/users/'
      } else {
        return '/users/table'
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
  mounted() {
    this.getData()
  },
  methods: {
    getClearFormObject() {
      return {
        id: null,
        name: null,
        created_date: new Date(),
        created_mm_dd_yyyy: null,
      }
    },
    getData() {
      if (this.$route.params.id) {
        this.$axios
          .$get(`/user/${this.$route.params.id}`)
          .then((r) => {
            const item = r.data
            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_at)
              this.createdReadable = dayjs(new Date(item.created_at)).format(
                'MMM D, YYYY'
              )
            } else {
              this.$router.push({ name: 'users' })
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

      if (this.isProfileExists) {
        this.$axios
          .$patch('/user', this.form)
          .then((resp) => {
            if (resp.success) {
              setTimeout(() => {
                this.isLoading = false

                this.$buefy.snackbar.open({
                  message: 'User has been Updated',
                  queue: false,
                })
              }, 500)
              this.$router.push({ name: 'users-table' })
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
      } else {
        this.$axios
          .$post('/user', this.form)
          .then((resp) => {
            if (resp.success) {
              setTimeout(() => {
                this.isLoading = false

                this.$buefy.snackbar.open({
                  message: 'User has been saved',
                  queue: false,
                })
              }, 500)
              this.$router.push({ name: 'users-table' })
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
