<template>
  <div>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Clients"
        icon="account-multiple"
      >
        <table-jenis-jafung
          :data-url="`/jenis_jafung/trash`"
          :checkable="false"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import TableJenisJafung from '@/components/Table/JenisJafung'
export default {
  components: {
    CardComponent,
    TableJenisJafung,
  },
  computed: {
    titleStack() {
      return ['Admin', 'Tables']
    },
  },
  head() {
    return {
      title: 'Tables — Jenis Jafung',
    }
  },
}
</script>
