<template>
  <section v-if="role !== 'User'" class="section is-main-section">
    <admin />
  </section>
  <section v-else-if="role === 'User'" class="section is-main-section">
    <user />
  </section>
</template>
<script>
import { mapState } from 'vuex'
import Admin from '@/components/Dashboard/Admin'
import User from '~/components/Dashboard/User'

export default {
  components: { Admin, User },
  data() {
    return {}
  },
  computed: {
    ...mapState(['role']),
  },
}
</script>
