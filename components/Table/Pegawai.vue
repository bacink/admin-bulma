<template>
  <section>
    <b-table
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      :data="data"
      :columns="columns"
      :current-page.sync="currentPage"
      :paginated="isPaginated"
      :total="total"
      :per-page="perPage"
      backend-pagination
      :loading="loading"
      @page-change="onPageChange"
    >
    </b-table>
  </section>
</template>

<script>
import columns from '@/components/Table/Column/pegawai.js'

export default {
  data() {
    return {
      columns,
      isPaginated: true,
      data: [],
      currentPage: 1,
      perPage: 10,
      total: 0,
      defaultSortDirection: 'asc',
      loading: false,
      jenis: 'pns',
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      const params = [
        // `sort_by=${this.sortField}.${this.sortOrder}`,
        `jenis=${this.jenis}`,
        `page=${this.currentPage}`,
        `limit=${this.perPage}`,
      ].join('&')

      await this.$axios
        .$get(`sim-asn/pegawai?${params}`)
        .then(({ data, pagination }) => {
          this.perPage = pagination.limit
          this.total = pagination.total
          this.currentPage = pagination.page

          this.loading = false
          this.data = data
        })
        .catch((err) => {
          this.loading = false
          throw new Error(err)
        })
    },
    onPageChange(page) {
      this.currentPage = page
      this.loadData()
    },
  },
}
</script>
