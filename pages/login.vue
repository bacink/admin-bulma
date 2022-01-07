<template>
  <section class="hero is-fullheight">
    <div class="hero-body has-text-centered">
      <div class="login">
        <img class="logo" src="/logo jafung.svg" />
        <b-progress v-show="progress" size="is-medium" show-value
          >trying to access</b-progress
        >
        <h1>SIUL JAFA</h1>
        <hr />
        <form @submit.prevent="addUser">
          <div class="field">
            <div class="control">
              <input
                v-model="userForm.email"
                class="input is-medium is-rounded"
                type="email"
                placeholder="hello@example.com"
                autocomplete="username"
                required
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <b-field :type="pass.type" :message="pass.msg">
                <b-input
                  v-model="userForm.password"
                  type="password"
                  label="Error"
                  custom-class="input is-rounded"
                  size="is-medium"
                  placeholder="Password reveal input"
                  required
                  password-reveal
                >
                </b-input
              ></b-field>
            </div>
          </div>
          <br />
          <button
            class="button is-block is-fullwidth is-primary is-medium"
            type="submit"
          >
            Login
          </button>

          <br />
          <p class="subtitle is-5">Or login with</p>
          <a
            class="button is-block is-fullwidth is-danger is-medium"
            href="https://sim-asn.bkpsdm.karawangkab.go.id/oauth/authorize?client_id=949304c6-ecd1-460a-a8fb-c5c4abf9e34e&redirect_uri=https://api.jafung.bkpsdm.karawangkab.go.id/api/callback/sim-asn&response_type=code&scope=*&state=login"
          >
            <img class="logo-sim-asn" src="/logo-sim-asn.png" />
            <span class="has-text-white">SIM-ASN</span>
          </a>
        </form>
        <br />
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <a href="#">Forgot Password?</a>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <a href="#">Create an Account</a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
import '@/assets/css/login.css'

export default {
  layout: 'blank',
  middleware: 'guest',
  data() {
    return {
      progress: false,
      pass: {
        msg: '',
        type: '',
      },
      userForm: {
        email: '',
        password: '',
      },
    }
  },
  created() {
    if (this.$route.query.error) {
      this.pass.msg = this.$route.query.error
    }
    if (this.$route.query.access_token) {
      this.progress = true

      this.$auth.setUserToken(this.$route.query.access_token).catch((error) => {
        this.pass.msg = error.message || 'Error login'
      })
    }
  },
  methods: {
    async addUser() {
      try {
        this.progress = true
        await this.$auth.loginWith('local', {
          data: this.userForm,
        })
      } catch (err) {
        this.progress = false
        if (err.response) {
          if (err.response.status === 422) {
            this.pass.msg = err.response.data.password
            this.pass.type = 'is-danger'
            this.errors = 'could not sign you with those credentials.'
          } else if (err.response.status === 401) {
            this.pass.msg = 'Incorrect Username or password'
            this.pass.type = 'is-danger'
          }
        }
      }
    },
  },
}
</script>
<style scoped>
.logo {
  width: 100px;
}
.logo-sim-asn {
  height: 20px;
}
</style>
