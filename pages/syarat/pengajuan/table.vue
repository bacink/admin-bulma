<template>
  <section class="section is-main-section">
    <b-card
      class="has-table has-mobile-sort-spaced is-primary"
      title="Data Syarat Pengajuan"
      header-icon="plus-box"
      @header-icon-click="addData"
    >
      <SyaratPengajuan />
    </b-card>
  </section>
</template>
<script>
import SyaratPengajuan from '@/components/Table/SyaratPengajuan'

export default {
  components: { SyaratPengajuan },
  data() {
    return {}
  },
  methods: {
    addData() {
      this.$router.push({ name: 'syarat-pengajuan-id' })
    },
  },
}
</script>
