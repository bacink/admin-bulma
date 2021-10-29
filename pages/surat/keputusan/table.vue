<template>
  <section class="section is-main-section">
    <div>
      <section class="section is-main-section">
        <b-card
          class="has-table has-mobile-sort-spaced is-primary"
          title="Data Surat Keputusan"
        >
          <SuratKeputusan />
        </b-card>
      </section>
    </div>
  </section>
</template>
<script>
import SuratKeputusan from '~/components/Table/SuratKeputusan.vue'

export default {
  components: { SuratKeputusan },
  data() {
    return {}
  },
  methods: {},
}
</script>
