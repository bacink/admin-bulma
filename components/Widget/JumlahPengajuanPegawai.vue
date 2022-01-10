<template>
  <section>
    <card-widget
      v-for="value in data"
      :key="value"
      class="tile is-child"
      :type="type"
      icon="account-multiple"
      :number="value"
      :label="label(status)"
    />
  </section>
</template>

<script>
import CardWidget from '@/components/CardWidget'
import { mapState } from 'vuex'
export default {
  components: { CardWidget },
  props: {
    status: {
      default: null,
      type: String,
    },
    type: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      data: {},
    }
  },
  computed: {
    ...mapState(['auth']),
  },
  mounted() {
    this.getDashboard(this.status)
  },
  methods: {
    label(value) {
      return this.humanize(value)
    },
    humanize(str) {
      let i
      const frags = str.split('_')
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
      }
      return frags.join(' ')
    },
    getDashboard(status) {
      this.$axios
        .$get(`dashboard/${status}/${this.auth.user.id_pegawai}`)
        .then((response) => {
          this.data = response
        })
        .catch((err) => {
          throw err
        })
    },
  },
}
</script>
