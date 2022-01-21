<template>
  <section class="section is-main-section">
    <b-card
      class="has-table has-mobile-sort-spaced is-primary"
      title="Data Syarat Pengajuan"
    >
      <Table />
    </b-card>
  </section>
</template>
<script>
import Table from '@/components/Table/Trash/SyaratPengajuan'

export default {
  components: { Table },
  data() {
    return {}
  },
}
</script>
