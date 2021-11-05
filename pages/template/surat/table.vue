<template>
  <section class="section is-main-section">
    <b-card
      class="has-table has-mobile-sort-spaced is-primary"
      title="Data Syarat Pengajuan"
      header-icon="plus-box"
      @header-icon-click="addData"
    >
      <template-surat />
    </b-card>
  </section>
</template>
<script>
import TemplateSurat from '~/components/Table/TemplateSurat.vue'

export default {
  components: { TemplateSurat },
  data() {
    return {}
  },
  methods: {
    addData() {
      this.$router.push({ name: 'template-surat-id' })
    },
  },
}
</script>
