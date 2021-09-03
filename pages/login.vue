<template>
  <section class="hero is-fullheight">
    <div class="hero-body has-text-centered">
      <div class="login">
        <img src="/logoipsum.svg" width="325px" />
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
            class="button is-block is-fullwidth is-primary is-medium is-rounded"
            type="submit"
          >
            Login
          </button>
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
  methods: {
    async addUser() {
      try {
        await this.$auth.loginWith('local', {
          data: this.userForm,
        })
      } catch (err) {
        if (err.response.status === 422) {
          this.pass.msg = err.response.data.password
          this.pass.type = 'is-danger'
          this.errors = 'could not sign you with those credentials.'
        } else if (err.response.status === 401) {
          this.pass.msg = 'Incorrect Username or password'
          this.pass.type = 'is-danger'
        }
      }
    },
  },
}
</script>
