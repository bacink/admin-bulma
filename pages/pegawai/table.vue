<template>
  <section class="section is-main-section">
    <b-card
      class="has-table has-mobile-sort-spaced is-primary"
      title="Data Surat Keputusan"
    >
      <Pegawai />
    </b-card>
  </section>
</template>
<script>
import Pegawai from '~/components/Table/Pegawai.vue'

export default {
  components: { Pegawai },
  data() {
    return {}
  },
  methods: {},
}
</script>
