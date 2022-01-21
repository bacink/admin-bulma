<template>
  <section class="section is-main-section">
    <b-card
      class="has-table has-mobile-sort-spaced is-primary"
      title="Data Pengajuan"
    >
      <PengajuanTrashTable />
    </b-card>
  </section>
</template>
<script>
import PengajuanTrashTable from '@/components/Table/Trash/Pengajuan'

export default {
  components: { PengajuanTrashTable },
  data() {
    return {}
  },
}
</script>
