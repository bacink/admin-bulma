<template>
  <section class="section is-main-section">
    <b-card
      class="has-table has-mobile-sort-spaced is-primary"
      title="Data Pengajuan"
      header-icon="plus-box"
      @header-icon-click="addData"
    >
      <PengajuanTable />
    </b-card>
  </section>
</template>
<script>
import PengajuanTable from '@/components/Table/Pengajuan'

export default {
  components: { PengajuanTable },
  data() {
    return {}
  },
  methods: {
    addData() {
      this.$router.push('pengajuan/')
    },
  },
}
</script>
