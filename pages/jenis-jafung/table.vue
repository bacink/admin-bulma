<template>
  <section class="section is-main-section">
    <div>
      <section class="section is-main-section">
        <b-card
          class="has-table has-mobile-sort-spaced is-primary"
          title="Data Jenis Jafung"
          header-icon="plus-box"
          @header-icon-click="addData"
        >
          <JenisJafung />
        </b-card>
      </section>
    </div>
  </section>
</template>
<script>
import JenisJafung from '@/components/Table/JenisJafung'

export default {
  components: { JenisJafung },
  data() {
    return {}
  },
  methods: {
    addData() {
      this.$router.push({ name: 'jenis-jafung-id' })
    },
  },
}
</script>
