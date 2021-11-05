<template>
  <section class="section is-main-section">
    <b-card
      class="has-table has-mobile-sort-spaced is-primary"
      title="Data Users"
      header-icon="plus-box"
      @header-icon-click="addData"
    >
      <Users />
    </b-card>
  </section>
</template>
<script>
import Users from '@/components/Table/Users'

export default {
  components: { Users },
  data() {
    return {}
  },
  methods: {
    addData() {
      this.$router.push({ name: 'users-id' })
    },
  },
}
</script>
